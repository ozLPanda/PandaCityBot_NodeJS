import {IconEnums} from "../enums/iconEnums.js";

export const Helper = {
    math:{
        formatPrice(x){
           return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
        }
    },
    text:{
        getIcons(cmd){
            let icon = IconEnums[cmd];
            return  icon ? icon : "";
        }
    },
    user:{
        async setExp(bot, user, exp){
            let lvlUp = false;
            let levelObject = await bot.db.models.UserLevelsModel.findOne({where: {lvl: user.lvl}});
            user.exp += exp;
            while(levelObject.exp_need <= user.exp){
                user.lvl += 1;
                lvlUp = true;
                user.exp = user.exp - levelObject.exp_need;
                levelObject = await bot.db.models.UserLevelsModel.findOne({where: {lvl: user.lvl}});
            }
            return lvlUp;
        }
    }
}