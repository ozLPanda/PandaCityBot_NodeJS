export default class MachineStates{
    command = null;
    date = null;
    _timeout = 30_000;
    constructor(cmd) {
        this.command = cmd;
        this.date = new Date();
    }

    // Проверяем не вышел ли таймаут времени действия машинного состояния
    isValid(){
        if((new Date() - this.date) > this._timeout)
            return false
        else
            return true
    }
}