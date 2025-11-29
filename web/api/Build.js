import DataBaseModule from "../modules/DatabaseState.js";
import {setObjectFieldIfNotEmptyOrNull} from "../utils/APIUtils.js";

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
    let build_list = await DataBaseModule.connection.models.BuildModel.findAll({
        include: [{ association: "Category" }],
        order: [["id", "ASC"]]
    });
    return build_list;
}

export async function getBuild({body}) {
    if(body.id == null) throw new Error("Invalid id");
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
        return await findBuildById(build.id);
    } else {
        throw new Error("Build nof found");
    }
}

export async function createBuild({body}) {
    const build = await DataBaseModule.connection.models.BuildModel.create({
        name: body.name,
        lvl: body.lvl,
        price: body.price,
        prestige_lvl: body.prestige_lvl,
        desc: body.desc ?? null,
        cmd: body.cmd,
        object_name: body.object_name,
        id_category: body.id_category,
        payday_coef: body.payday_coef,
        exp: body.exp
    });
    await build.save();
    return await findBuildById(build.id);
}