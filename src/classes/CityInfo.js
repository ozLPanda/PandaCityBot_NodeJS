export default class CityInfo {
  cityInfoKeys = ['buildsHouse', 'business', 'buildsFactory']

  _json = ''

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
    if (json != null) {
      this._json = json
      let obj = JSON.parse(json)

      for (let key in obj) {
        if (key == 'cityInfoKeys' || key == '_json') continue

        if (this[key] === undefined && obj[key] !== null && typeof obj[key] === 'object') {
          this[key] = {}
          if (!this.cityInfoKeys.includes(key)) {
            this.cityInfoKeys.push(key)
          }
        }

        if (this[key] !== null && this[key] !== undefined) {
          for (let keyField in obj[key]) {
            this[key][keyField] = obj[key][keyField]
          }
        }
      }
    }
  }

  ensureCategory(key) {
    if (key == null) return
    if (this[key] === undefined) {
      this[key] = {}
    }
    if (!this.cityInfoKeys.includes(key)) {
      this.cityInfoKeys.push(key)
    }
  }

  getJSON() {
    let compact = {}
    for (let keyCategory of this.cityInfoKeys) {
      if (this[keyCategory] == null) continue
      let hasValues = false
      let category = {}
      for (let key in this[keyCategory]) {
        let value = this[keyCategory][key]
        if (value != null && value !== 0) {
          category[key] = value
          hasValues = true
        }
      }
      if (hasValues) {
        compact[keyCategory] = category
      }
    }
    return JSON.stringify(compact)
  }

  getCityInfo() {
    let resp = {}
    for (let keyCategory of this.cityInfoKeys) {
      for (let key in this[keyCategory]) {
        if (this[keyCategory][key] != null) {
          resp[key] = this[keyCategory][key]
        }
      }
    }
    return resp
  }
}
