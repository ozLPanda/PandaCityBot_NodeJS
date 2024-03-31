import Command from "../../engine/commonClasses/Command.js";
import Job from "../classes/Job.js";
import {Helper} from "../functions/commonFunctions.js";


export default class JobCommandCallback extends Command {
    constructor(bot) {
        super("jobs", async (msg, ctx) => {
            let idJob = ctx.data.split("/")[1];
            let user = await bot.getUser(msg);

            let job = await bot.db.models.JobsModel.findOne({
                where:{
                    id: idJob
                }
            });

            if(job != null){
                let jobModel = new Job(job.dataValues);
                let event = jobModel.getRandomEvent();
                let payday = Number(job.dataValues.income_rate) * event.payday;

                user.money += payday;
                if(user.money < 0) user.money = 0;
                await user.save();

                await bot.answerCallbackQuery(ctx.id).then(async () => {
                    await bot.sendMessage(msg.chat.id, event.text);
                    if(payday >= 0){
                        await bot.sendMessage(msg.chat.id, `Вы заработали: ${Helper.math.formatPrice(payday)}💵`);
                    }else{
                        await bot.sendMessage(msg.chat.id, `Вы потеряли: ${Helper.math.formatPrice(payday)}💵`);
                    }
                })

            }
        });
    }
}