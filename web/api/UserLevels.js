import DataBaseModule from "../modules/DatabaseState.js";
import { setObjectFieldIfNotEmptyOrNull } from "../utils/APIUtils.js";

async function findUserLevelById(id) {
  return await DataBaseModule.connection.models.UserLevelsModel.findOne({
    where: {
      id: id
    }
  });
}

export async function getUserLevels() {
  return await DataBaseModule.connection.models.UserLevelsModel.findAll({
    order: [["lvl", "ASC"]]
  });
}

export async function getUserLevel({ body }) {
  return await findUserLevelById(body.id);
}

export async function updateUserLevel({ body }) {
  let level = await findUserLevelById(body.id);
  if (level != null) {
    setObjectFieldIfNotEmptyOrNull(body, level);
    await level.save();
  } else {
    throw new Error("User level not found");
  }
}

export async function removeUserLevel({ body }) {
  let level = await findUserLevelById(body.id);
  if (level != null) {
    await DataBaseModule.connection.models.UserLevelsModel.destroy({
      where: {
        id: body.id
      }
    });
  } else {
    throw new Error("User level not found");
  }
}

export async function createUserLevel({ body }) {
  const level = await DataBaseModule.connection.models.UserLevelsModel.create({
    name: body.name,
    lvl: body.lvl,
    exp_need: body.exp_need
  });
  await level.save();
  return level;
}
