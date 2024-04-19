
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