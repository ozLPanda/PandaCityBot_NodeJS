import inlineButtons from "../classes/InlineButtons.js";

export const MainMenuInlineKeyboard = {
    async showMainMenu(bot, msg) {
        await bot.sendMessage(msg.chat.id, "Вот что я умею", new inlineButtons([{
            row: 1,
            text: "Построить",
            callback_data: "menu.builds",
        }]))
    }
}