export default class Command{
    // Название команды
    cmd = null
    // Функция исполняющаяся при вызове команды
    callback = null
    constructor(cmd, callback) {
        this.cmd = cmd;
        this.callback = callback
    }

    onCallback(msg){
        this.callback(msg);
    }
}