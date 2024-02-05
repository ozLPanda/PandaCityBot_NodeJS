// Базовый класс любой команды
export default class Command{
    // Название команды
    cmd = null
    // Функция исполняющаяся при вызове команды
    callback = null
    constructor(cmd, callback) {
        this.cmd = cmd;
        this.callback = callback
    }

    onCallback(msg, ctx){
        this.callback(msg, ctx);
    }
}