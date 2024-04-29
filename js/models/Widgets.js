//Imports
import Util from '../Utility.js';
import { weatherInfo, countryAttr, stateAttr } from '../localData.js';

//Country Widgets Model
export class CountryWidgets {
  //Public Properties
  constructor() {
    this.id;
    this.main;
    this.timezone;
    this.weather;
    this.wind;
  }

  //Public Method
  async update() {
    //Updates the model

    const coords = this._getCoords();

    const url = Util.updateFromCoords(weatherInfo, coords);

    const { main, timezone, weather, wind } = await this._fetchData(url);

    this.id = countryAttr.id;
    this.main = main;
    this.timezone = timezone;
    this.weather = weather[0];
    this.wind = wind;
  }

  //Private Methods
  _getCoords() {
    //Returns the coordinates of the Country's capital

    const { latitude, longitude } = countryAttr.capital;

    return { latitude, longitude };
  }

  async _fetchData(url) {
    //Fetches meteorologic data from an URL and returns its most relevant properties

    try {
      const response = await fetch(url);

      const { main, timezone, weather, wind } = await response.json(); //Object containing meteorologic data

      return { main, timezone, weather, wind };
    } catch (err) {
      console.error(err);
    }
  }
}

//State Widgets Model
export class StateWidgets extends CountryWidgets {
  //Public Properties
  constructor() {
    super();
  }

  //Public Method
  async update(stateId) {
    //Updates the model

    const coords = this._getCoords(stateId);

    const url = Util.updateFromCoords(weatherInfo, coords);

    const { main, timezone, weather, wind } = await this._fetchData(url);

    this.id = stateId;
    this.main = main;
    this.timezone = timezone;
    this.weather = weather[0];
    this.wind = wind;
  }

  //Private Method
  _getCoords(stateId) {
    //Returns the coordinates of the State's capital

    const state = stateAttr.find((state) => state.id == stateId);

    const { latitude, longitude } = state.capital;

    return { latitude, longitude };
  }
}

//County Widgets Model
export class CountyWidgets extends CountryWidgets {
  //Public Properties
  constructor() {
    super();
  }

  //Public Method
  async update(coords) {
    //Updates the model

    const url = Util.updateFromCoords(weatherInfo, coords);

    const { main, timezone, weather, wind } = await this._fetchData(url);

    this.main = main;
    this.timezone = timezone;
    this.weather = weather[0];
    this.wind = wind;
  }
}
