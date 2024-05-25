
// Функция ищет и переносит совпадающие поля из объекта в объект
export function setObjectFieldIfNotEmptyOrNull(from, to){
    for(let key in from){
        if(from[key] !== null && from[key] !== "" && from[key] !== undefined){
            if(Object.keys(to).includes(key)){
                to[key] = from[key];
            }
        }
    }
}

// Устанавливает ключи объекту без проверок
export function setObjectField(from, to){
    for(let key in from){
        if(Object.keys(to).includes(key)){
            to[key] = from[key];
        }
    }
}


export function useErrorHandler(res){
    let errorMsg = []
    
    function isNullOrEmpty(field, errMsg){
        if(field == null || field == undefined){
            errorMsg.push(errMsg)
        }
    }

    function sendErrorNotFound(msg){
        res.status(404).send({error: msg, status: 404})
        return false
    }
    
    async function checkStatus(callback){
        if(errorMsg.length > 0){
            res.status(400).send({error: errorMsg, status: 400})
            return false
        }
        return await callback()
    }
    
    return {
        isNullOrEmpty,
        checkStatus,
        sendErrorNotFound
    }
}