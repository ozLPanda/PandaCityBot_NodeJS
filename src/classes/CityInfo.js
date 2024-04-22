export default class CityInfo {
    cityInfoKeys = ["buildsHouse", "business", "buildsFactory"];

    _json = "";

    buildsHouse = {
        smallHouse1: 0,
        middleHouse1: 0,
        largeHouse1: 0,
        apartmentBuild1: 0,
        modernQuarter: 0,
        closedEliteVillage: 0

    }

    business = {
        farmingLevel1: 0,
        farmingLevel2: 0,
        farmingLevel3: 0,
        shoppingCentre: 0,
        franchise: 0
    }

    buildsFactory = {
        smallFactory1: 0,
        dairyPlant: 0
    }

    constructor(json) {
        if(json != null) {
            this._json = json;
            let obj = JSON.parse(json);
            Object.assign(this, obj);
        }
    }

    getJSON(){
        return JSON.stringify(this);
    }

    getCityInfo(){
        let resp = {}
        for(let keyCategory of this.cityInfoKeys){
            for(let key in this[keyCategory]){
                if(this[keyCategory][key] != null){
                    resp[key] = this[keyCategory][key];
                }
            }
        }
        return resp;
    }
}