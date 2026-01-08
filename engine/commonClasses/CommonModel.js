import {Model} from "sequelize";

export default class CommonModel extends Model {
    execute(ctx, cmd, obj){
        switch(cmd){
            case "create":
                ctx.create(obj);
                break;
            case "delete":
                ctx.delete(obj);
                break;
            case "select":
                ctx.select(obj);
                break;
            case "update":
                ctx.update(obj);
                break;
        }
    }
}