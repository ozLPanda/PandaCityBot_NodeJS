import Command from "./Command.js";

export default class CommandAndAnswer extends Command{
    response = null;
    constructor(cmd, callback, response) {
        super(cmd, callback);
        this.response = response;
    }
}