//Imports
import Util from '../Utility.js';
import { stateListUrl, countyListUrl } from '../localData.js';

//State List Model
export class StateList {
  //Public Property
  constructor() {
    this.list;
  }

  //Public Method
  async update() {
    //Updates the model

    const url = Util.getUrls(stateListUrl);
    this.list = await this._fetchData(url);
  }

  //Private Method
  async _fetchData(url) {
    //Fetches data from an URL and returns it

    try {
      const response = await fetch(url);
      const list = await response.json(); //Array of objects that compose a list of states/counties

      return list;
    } catch (err) {
      console.error(err);
    }
  }
}

//County List Model
export class CountyList extends StateList {
  //Public Property
  constructor() {
    super();
  }

  //Public Method
  async update(stateId) {
    //Updates the model based on the specified State ID

    const url = Util.updateFromId(countyListUrl, stateId);
    this.list = await this._fetchData(url);
  }
}
