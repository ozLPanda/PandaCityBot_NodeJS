import DataBase from "../../src/classes/DataBase.js";
import BuildItemsModel from "../../src/dataBaseModels/BuildItemsModel.js";
import BuildCategoryModel from "../../src/dataBaseModels/BuildCategoryModel.js";

export default {
    connection: null,
    debug_mode: false,
    async init() {
        this.connection = new DataBase(this.debug_mode);
        BuildItemsModel.hasOne(BuildCategoryModel, {as: "Category", foreignKey: "id"});
        await this.connection.authenticate().then(async res => {
            console.log('DataBase connected');
        }).catch(ex => {
            console.error(ex);
        });
    }
}