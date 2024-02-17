import moment from "moment";

export default class Service{
    name = ""
    callback = null;

    constructor(name, callback) {
        this.name = name;
        this.callback = callback;
    }

    update(bot){
        try {
            this.callback?.(bot);
            console.log(`${moment().format("DD.MM.YYYY HH:mm:ss")} ${this.name} updated`);
        }catch (ex){
            console.log(`${moment().format("DD.MM.YYYY HH:mm:ss")} ${this.name} crashed\n${ex}`);
        }
    }
}