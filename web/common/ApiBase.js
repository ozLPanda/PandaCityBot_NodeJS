export class ApiController{
    name = "Controller";
    middlewares = [];
    urls = [];

    constructor(name, url, middlewares) {
        this.name = this.name+"_"+name;
        this.url = url;
        this.middlewares = middlewares;
    }
}

export class ApiRequest{
    url = null;
    callback = null;
    middlewares = [];

    // Настройки для группового роутера
    apiGroupRouter = null;
    routerGroups = false;

    constructor(url, callback, middlewares) {
        this.url = url;
        this.callback = callback;
        this.middlewares = middlewares;
    }

    // Вызов метода для запроса
    onCallback(){
        try{
            this.callback?.();
        }catch (ex){
            console.error(`Error in ApiRequest: ${this.url}\n`+ex);
        }
    }

    setGroupRoutes(apiGroupRouter){
        this.apiGroupRouter = apiGroupRouter;
        this.routerGroups = true;
    }
}

export class ApiGroupRoutes{
    url = null;
    ApiRequests = [];
    middlewares = [];

    constructor(url, ApiRequests, middlewares) {
        this.url = url;
        this.ApiRequests = ApiRequests;
        this.middlewares = middlewares;
    }

    onRequest(requestUrl){
        let apiRequest = this.ApiRequests.find(i => i.url == requestUrl);
        if(apiRequest !== null){
            apiRequest.onCallback();
        }
    }
}

export class ApiMiddleware{
    name = "BaseMiddleware";
    checkFunc = null;
    constructor(name, checkFunc) {
        this.name = this.name+"_"+name;
        this.checkFunc = checkFunc;
    }

    check(){
        try{
            this.checkFunc?.();
        }catch (ex){
            console.error(`Error in ${this.name}\n`+ex);
        }
    }
}