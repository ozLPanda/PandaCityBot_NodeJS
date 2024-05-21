import {ObjectUtils} from "../utils/ObjectUtils.js";

export class UserSettings{
    _json = null

    buyCount = 1

    constructor(json) {
        if(json === "" || json === null){
            return
        }
        this._json = json
        const {CopyJSONObjectData} = ObjectUtils()
        CopyJSONObjectData(this, json)
    }

    getJSON(){
        let obj = JSON.parse(JSON.stringify(this))
        delete obj._json
        let jsonString = JSON.stringify(obj)
        return jsonString
    }
}