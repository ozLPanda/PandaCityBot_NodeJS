
export default class LoginMiddleware {
    _bot = null;

    constructor(bot) {
        this._bot = bot;
    }

    async check(msg){
        let user = await this._bot.getUser(msg);
        if(user != null){
            return true
        }
        else return false
    }

    async toFail(msg){
        await this._bot.sendMessage(msg.chat.id, "Сначала создайте город!\n /start");
    }
}