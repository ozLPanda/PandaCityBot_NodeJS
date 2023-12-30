import sequelize from "sequelize";

export default class DefaultModel extends sequelize.Model {
    constructor(props) {
        super(props);
    }

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