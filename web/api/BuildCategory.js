import DataBaseModule from "../modules/DatabaseState.js";
import {setObjectFieldIfNotEmptyOrNull} from "../utils/APIUtils.js";

async function findCategoryById(id){
    return await DataBaseModule.connection.models.BuildCategoryModel.findOne(
        {
            where:{
                id: id
            }
        }
    )
}

export async function getBuildCategories({body}){
    return await DataBaseModule.connection.models.BuildCategoryModel.findAll();
}

export async function getBuildCategory({body}){
    return await findCategoryById(body.id);
}

export async function updateBuildCategory({body}){
    let category = await findCategoryById(body.id);
    if(category != null){
        setObjectFieldIfNotEmptyOrNull(body, category);
        await category.save();
    }else{
        throw new Error("Category not found");
    }
}

export async function removeBuildCategory({body}){
    let category = await findCategoryById(body.id);
    if(category != null){
        await DataBaseModule.connection.models.BuildCategoryModel.destroy({
            where:{
                id: body.id,
            }
        });
    }else{
        throw new Error("Category not found");
    }
}

export async function createBuildCategory({body}){
    const category = await DataBaseModule.connection.models.BuildCategoryModel.create({
        name: body.name,
        code_name: body.code_name
    });
    await category.save();
    return category;
}