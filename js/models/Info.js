//Imports
import Util from '../Utility.js';
import { countryInfoUrls, stateInfoUrls, countyInfoUrls, countryAttr, stateAttr } from '../localData.js';

//Country Info Model
export class CountryInfo {
  //Public Properties
  constructor() {
    this.info;
    this.abbrev;
    this.capitalName;
    this.capitalId;
  }

  //Public Method
  async update() {
    //Updates the model

    //Local data
    this.abbrev = countryAttr.abbrev;
    this.capitalName = countryAttr.capital.name;
    this.capitalId = countryAttr.capital.cityId;

    //Fetched data
    this.info = [];

    const urls = Util.getUrls(countryInfoUrls);
    const themes = await this._fetchData(urls);
    themes.forEach((theme) => this.info.push(theme[0]));
  }

  //Private Method
  async _fetchData(urlArr) {
    //Fetches data from an array of URLs and returns it

    try {
      const fetchUrls = urlArr.map((url) => fetch(url)); //URL fetch

      const responses = await Promise.all(fetchUrls); //Array of responses

      const jsonResponses = responses.map((response) => response.json()); //Response Method 'json' applied to each response of the array

      const themes = await Promise.all(jsonResponses); //Array of info themes

      return themes;
    } catch (err) {
      console.error(err);
    }
  }
}

//State Info Model
export class StateInfo extends CountryInfo {
  //Public Properties
  constructor() {
    super();
    this.region;
    this.regionAbbrev;
  }

  //Public Method
  async update(stateId) {
    //Updates the model based on the specified State ID

    //Local data
    const state = stateAttr.find((state) => state.id == stateId);
    this.abbrev = state.abbrev;
    this.capitalName = state.capital.name;
    this.capitalId = state.capital.id;
    this.region = state.region.name;
    this.regionAbbrev = state.region.abbrev;

    //Fetched data
    this.info = [];

    const urls = Util.updateFromId(stateInfoUrls, stateId);
    const themes = await this._fetchData(urls);
    themes.forEach((theme) => this.info.push(theme[0]));
  }
}

//County Info Model
export class CountyInfo extends CountryInfo {
  //Public Properties
  constructor() {
    super();
    this.isCapital;
    this.coordinates;
  }

  //Public Method
  async update(countyId) {
    //Updates the model based on the specified County ID

    //Local data
    this.isCapital = stateAttr.some((state) => state.capital.id == countyId);

    //Fetched data
    this.info = [];

    const urls = Util.updateFromId(countyInfoUrls, countyId);
    const themes = await this._fetchData(urls);
    themes.forEach((theme) => this.info.push(theme[0]));
    this.coordinates = this.info[2].centroide;
  }
}
