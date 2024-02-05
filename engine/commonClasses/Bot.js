import TelegramBot from "node-telegram-bot-api";
import MachineStates from "./MachineStates.js";
import {ErrorEnum} from "../../src/enums/ErrorEnums.js";

export default class Bot extends TelegramBot {
    _token = null
    _bot = null;
    _commands = [];
    _commands_callback_query = [];
    machineStatesUser = {};
    models = {};
    db = null; // База данных

    constructor(token) {
        super(token, {
            polling: {
                interval: 300,
                autoStart: true
            }
        });
        console.log("Bot created");
    }

    async on(){
        super.on("text", async (msg)=>{
            // Получаем состояния пользователя
            let machine_resp = this.checkMachineState(msg);
            // Проверяем есть ли на нём какое-то состояние
            if(machine_resp?.status){
                // Вызываем команду, которая ожидает пользователя
                machine_resp.machineState?.command?.onResponse(msg);

            }else {
                // Ищем что хочет использовать пользователь
                if (msg.text[0] == "/") {
                    if(this.checkCommand(msg) == true){
                        return
                    }
                }
                await this.sendMessage(msg.chat.id, ErrorEnum.UnknownCommand);
            }
        })
        super.on("callback_query", async (ctx) =>{
            // Если команда составная, делим её на 2 части
            let search_val = ctx.data;
            if(ctx.data.indexOf("/") != -1){
                search_val = ctx.data.split("/")[0];
            }
            let cmd = this._commands_callback_query.find(el=>el.cmd == search_val);
            if(cmd != null)
                cmd?.onCallback(ctx.message, ctx);
        })
    }

    // Регистрируем команды для бота
    regCommand(command){
        this._commands.push(command);
        console.log(`Registered command: ${command.cmd}`);
    }

    // Регистрируем команду для ответа на нажатие кнопок
    regCallbackCommand(command){
        this._commands_callback_query.push(command);
        console.log(`Register callback command ${command.cmd}`);
    }

    // Ищем нужную команду и выполняем её
    checkCommand(msg){
        let command = this._commands.find(el=>el.cmd == msg.text);
        if(command != null){
            try {
                command?.onCallback(msg);
            }catch (ex){
                console.error(ex);
            }
            return true;
        }else{
            return false;
        }
    }

    regMachineState(msg, cmd){
        this.machineStatesUser[msg.chat.id] = new MachineStates(cmd);
    }

    // Проверка есть ли ожидание ответа от текущего пользователя
    checkMachineState(msg){
        let users = Object.keys(this.machineStatesUser);
        if(users.includes(String(msg.chat.id))){
            let machineState = this.machineStatesUser[msg.chat.id];
            delete this.machineStatesUser[msg.chat.id];
            return {status: machineState.isValid(), machineState}
        }
    }
}