import TelegramBot from "node-telegram-bot-api";
import MachineStates from "./MachineStates.js";

export default class Bot extends TelegramBot {
    _token = null
    _bot = null;
    _commands = [];
    machineStatesUser = {};
    models = {};

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
            if(msg.text[0] == "/"){
                this.checkCommand(msg);
            }
        })
    }

    regCommand(command){
        this._commands.push(command);
        console.log(`Registered command: ${command.cmd}`);
    }

    checkCommand(msg){
        let command = this._commands.find(el=>el.cmd == msg.text);
        if(command != null){
            command?.onCallback(msg);
        }
    }

    regMachineState(msg){
        this.machineStatesUser[msg.chat.id] = new MachineStates();
    }

    // Проверка есть ли ожидание ответа от текущего пользователя
    checkMachineState(msg){
        if(this.machineStatesUser.keys.includes(msg.chat.id)){
            let machineState = this.machineStatesUser[msg.chat.id];
            return machineState.isValid();
        }
    }

    addModels(key, model){
        this.models[key] = model;
    }

    executeCommandModel(name, cmd, obj){
        // execute - функция которая перебирает необходимые команды create, delete, update, select
        this.models[name].execute(cmd, obj);
    }
}