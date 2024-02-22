import Command from "../../engine/commonClasses/Command.js";
import moment from "moment";

export default class PaydayCommand extends Command{
    constructor(bot) {
        super("💵Собрать налоги", async (msg)=>{
            let user = await bot.getUser(msg);
            if(user != null){
                let utc = user.last_payday;
                if(utc == null) utc = user.created_at;

                let sub = Number(Math.round(moment() / 1000)) - utc;
                sub = Math.round(sub / 1000);

                if(sub > 300_000){
                    let x = sub;
                }
            }
        });
    }
}