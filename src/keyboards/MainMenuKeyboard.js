import KeyboardButtons from "../../engine/commonClasses/KeyboardButtons.js";

export const MainMenuKeyboard = {
    async showMainMenu(bot, msg) {
        await bot.sendMessage(msg.chat.id, "Вот что я умею", new KeyboardButtons(
            [
                {
                    row: 1,
                    text: "🏢Информация о городе",
                },
                {
                    row: 1,
                    text: "🏗Построить здания",
                },
                {
                    row: 2,
                    text: "💼Работы",
                },
                {
                    row: 2,
                    text: "💵Собрать налоги",
                },
                {
                    row: 2,
                    text: "🥇Рейтинг",
                }
            ]
        ))
    }
}