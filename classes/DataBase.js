import {Sequelize} from "sequelize";

export default class DataBase extends Sequelize{

    constructor() {
        super('bot', 'root', '', {
            host: 'localhost',
            dialect: "mysql",
            pool: {
                max: 10, //максимальное кол-во соединений в пуле (Default: 5)
                min: 0, //минимальное кол-во соединений в пуле (Default: 0)
                acquire: 30000, //время в миллисекундах, в течение которого будет осуществляться попытка установить соединение, прежде чем будет сгенерировано исключение (Default: 60000)
                idle: 10000, //время простоя в миллисекундах, по истечении которого соединение покинет пул (Default: 1000)
            },
        })
    }
}