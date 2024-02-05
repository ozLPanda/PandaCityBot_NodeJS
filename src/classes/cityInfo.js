export default class CityInfo {
    buildsHouse = {
        smallHouse1: 0,
        middleHouse1: 0,
        largeHouse1: 0,
        apartmentBuild1: 0,
    }

    business = {
        farmingLevel1: 0,
        farmingLevel2: 0,
    }

    buildsFactory = {
        smallFactory1: 1,
    }

    constructor(json) {
        if(json != null) {
            let obj = JSON.parse(json);
            console.log(obj);
            Object.assign(this, obj);
            console.log(this);
        }
    }

    getJSON(){
        return JSON.stringify(this);
    }
}