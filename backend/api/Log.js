import DataBaseModule from "../modules/DatabaseState.js";

export async function getLogs(){
    return await DataBaseModule.connection.models.LogsModel.findAll({
        include:[
            {association: "UserInfoLog"}
        ],
    });
}