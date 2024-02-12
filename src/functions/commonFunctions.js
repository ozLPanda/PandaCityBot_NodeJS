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
    }
}