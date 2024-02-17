import ServiceBuildItems from "../classes/ServiceBuildItems.js";


function registerServices(bot){
    // Регистрация сервиса списка построек
    let serviceBuildMenu = new ServiceBuildItems();
    bot.registerService(serviceBuildMenu);

    bot.updateServices().then();
}


export default registerServices