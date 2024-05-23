import DataBase from "../../src/classes/DataBase.js";

export default {
    connection: null,
    debug_mode: true,
    async init() {
        this.connection = new DataBase(this.debug_mode);
        await this.connection.authenticate().then(async res => {
            console.log('DataBase connected');
        }).catch(ex => {
            console.error(ex);
        });
    }
}