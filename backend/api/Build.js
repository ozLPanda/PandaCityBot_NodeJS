import DataBaseModule from "../modules/DatabaseState.js";
import {setObjectFieldIfNotEmptyOrNull} from "../utils/APIUtils.js";
import sequelize, {Sequelize} from "sequelize";
import BuildCategoryModel from "../../src/dataBaseModels/BuildCategoryModel.js";
import BuildItemsModel from "../../src/dataBaseModels/BuildItemsModel.js";

async function findBuildById(id) {
    return await DataBaseModule.connection.models.BuildModel.findOne({
        where: {
            id: id,
        },
        include: [{association: "Category"}],
        group: "id",
    })
}

export async function getBuilds() {
    let build_list = await DataBaseModule.connection.models.BuildModel.findAll();
    return build_list;
}

export async function getBuild({body}) {
    let t1 = await findBuildById(body.id);
    return t1;
}

export async function removeBuild({body}) {
    await DataBaseModule.connection.models.BuildModel.destroy({
        where: {
            id: body.id
        }
    })
}

export async function updateBuild({body}) {
    let build = await findBuildById(body.id);
    if (build != null) {
        setObjectFieldIfNotEmptyOrNull(body, build);
        await build.save();
    } else {
        throw new Error("Build nof found");
    }
}