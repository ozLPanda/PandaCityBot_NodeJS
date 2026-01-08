export function ObjectUtils() {
    function CopyObjectData(target, source){
        for(let key in source){
            if(target[key] !== null){
                target[key] = source[key];
            }
        }
    }

    function CopyJSONObjectData(target, sourceJSON){
        let obj = JSON.parse(sourceJSON);
        CopyObjectData(target, obj);
    }

    return {
        CopyObjectData,
        CopyJSONObjectData
    }
}