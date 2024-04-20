import DataBaseModule from "../modules/DatabaseState.js";
import {EnumsResult} from "../common/Enums.js";
import BannedModel from "../../src/dataBaseModels/BannedModel.js";
import {ApiController, ApiRequest} from "../common/ApiBase.js";


export const UserController = new ApiController("User",  [

], []);


async function findUserById(id) {
    return await DataBaseModule.connection.models.UserModel.findOne({
        where: {
            id_chat: id
        }
    });
}

export async function getUsers() {
    return await DataBaseModule.connection.models.UserModel.findAll();
}

export async function getUser({body}) {
    return await findUserById(body.id);
}

export async function saveUser(req) {
    let user = await findUserById(req);
    if (user != null) {
        let body = req.body;
        user = user[0];
        user.name = body.name;
        user.money = body.money;
        user.admin_lvl = body.admin_lvl;
        let res = await user.save();
        return EnumsResult.Success;
    } else {
        throw new Error("User не найден");
    }
}

export async function removeUser(req) {
    let user = await findUserById(req);
    if (user != null) {
        let body = req.body;
        user.deleted = true;
        await user.save();
        return EnumsResult.Success;
    }
}

export async function banUser(req) {
    throw new Error("Not found function")
    let user = await findUserById(req.body.admin_id);
    if (user != null) {
        switch (user.admin_lvl) {
            case 3: {
                // if(user.)
            }
                break;
        }
        let body = req.body;
        let ban_record = await BannedModel.create({
            admin_id: body.admin_id,
            user_id: body.user_id,
        });
    }
}