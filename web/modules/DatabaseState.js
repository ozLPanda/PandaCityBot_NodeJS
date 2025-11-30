import DataBase from "../../src/classes/DataBase.js";

export default {
    connection: null,
    debug_mode: true,
    async init() {
        this.connection = new DataBase(this.debug_mode);
        try {
            await this.connection.authenticate();
            console.log('DataBase connected');
            await this.connection.migrate();
        } catch (ex) {
            console.error(ex);
        }
    }
}