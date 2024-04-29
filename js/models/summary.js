//Imports
import { StateList, CountyList } from './List.js';
import { CountryMap, StateMap, AltStateMap } from './Map.js';
import { CountryInfo, StateInfo, CountyInfo } from './Info.js';
import { CountryWidgets, StateWidgets, CountyWidgets } from './Widgets.js';
import Legend from './Legend.js';

//Model Objects
export const countryModels = {
  list: new StateList(),
  map: new CountryMap(),
  altMap: null,
  info: new CountryInfo(),
  widgets: new CountryWidgets(),
  legend: new Legend(),
};

export const stateModels = {
  list: new CountyList(),
  map: new StateMap(),
  altMap: new AltStateMap(),
  info: new StateInfo(),
  widgets: new StateWidgets(),
  legend: new Legend(),
};

export const countyModels = {
  list: null,
  map: null,
  altMap: null,
  info: new CountyInfo(),
  widgets: new CountyWidgets(),
  legend: null,
};
