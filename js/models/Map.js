//Imports
import Util from '../Utility.js';
import { countryMapUrls, stateMapUrls, altStateMapUrls, countryAttr, stateAttr } from '../localData.js';

//Country Map Model
export class CountryMap {
  //Public Properties
  constructor() {
    this.svgMaps;
    this.capitalId;
  }

  //Public Method
  async update() {
    //Updates the model

    //Local data
    this.capitalId = countryAttr.capital.id;

    //Fetched data
    const urls = Util.getUrls(countryMapUrls);
    this.svgMaps = await this._fetchData(urls);
  }

  //Private Method
  async _fetchData(urlArr) {
    //Fetches data from an array of URLs and returns it

    try {
      const fetchUrls = urlArr.map((url) => fetch(url)); //URL fetch

      const responses = await Promise.all(fetchUrls); //Array of responses

      const textResponses = responses.map((response) => response.text()); //Response Method 'text' applied to each response of the array

      const svgMaps = await Promise.all(textResponses); //Array of layers that compose the map

      return svgMaps;
    } catch (err) {
      console.error(err);
    }
  }
}

//State Map Model
export class StateMap extends CountryMap {
  //Public Properties
  constructor() {
    super();
  }

  //Public Method
  async update(stateId) {
    //Updates the model based on the specified State ID

    //Local data
    const state = stateAttr.find((state) => state.id == stateId);
    this.capitalId = state.capital.id;

    //Fetched data
    const urls = Util.updateFromId(stateMapUrls, stateId);
    this.svgMaps = await this._fetchData(urls);
  }
}

//Alternative State Map Model (minimum quality SVGs)
export class AltStateMap extends CountryMap {
  //Public Properties
  constructor() {
    super();
  }

  //Public Method
  async update(stateId) {
    //Updates the model based on the specified State ID

    //Local data
    const state = stateAttr.find((state) => state.id == stateId);
    this.capitalId = state.capital.id;

    //Fetched data
    const urls = Util.updateFromId(altStateMapUrls, stateId);
    this.svgMaps = await this._fetchData(urls);
  }
}
