import DataBase from "../../src/classes/DataBase.js";

const defaultRetryDelayMs = 3000;
const defaultMaxAttempts = 10;

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default {
    connection: null,
    debug_mode: true,
    async init(attempts = defaultMaxAttempts, retryDelayMs = defaultRetryDelayMs) {
        this.connection = new DataBase(this.debug_mode);
        let lastError;

        for (let attempt = 1; attempt <= attempts; attempt++) {
            try {
                await this.connection.authenticate();
                console.log('DataBase connected');
                await this.connection.migrate();
                return;
            } catch (ex) {
                lastError = ex;
                console.error(`Database connection attempt ${attempt}/${attempts} failed:`, ex?.message || ex);

                if (attempt < attempts) {
                    await delay(retryDelayMs);
                }
            }
        }

        throw lastError;
    },
}
