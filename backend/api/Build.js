import DataBaseModule from "../modules/DatabaseState.js";

async function findBuildById(id){
    return await DataBaseModule.connection.models.BuildModel.findOne({
        where:{
            id: id,
        }
    })
}

export async function getBuilds(){
    let build_list = await DataBaseModule.connection.models.BuildModel.findAll();
    return build_list;
}

export async function getBuild({body}){
    return await findBuildById(body.id);
}

export async function removeBuild({body}){
    await DataBaseModule.connection.models.BuildModel.destroy({
        where:{
            id: body.id
        }
    })
}

export async function updateBuild({body}){
    let build = await findBuildById(body.id);
    if(build != null){
        // build.
    }
}