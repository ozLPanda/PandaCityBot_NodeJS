import ServiceBuildItems from "../Services/ServiceBuildItems.js";
import ServiceBuildEconomy from "../Services/ServiceBuildEconomy.js";


function registerServices(bot){
    // Регистрация сервиса списка построек
    let serviceBuildMenu = new ServiceBuildItems();
    bot.registerService(serviceBuildMenu);

    let serviceBuildEconomy = new ServiceBuildEconomy();
    bot.registerService(serviceBuildEconomy);

    bot.updateServices().then();
}


export default registerServices