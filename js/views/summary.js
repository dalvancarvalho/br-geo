//Imports
import { StateListView, CountyListView } from './ListView.js';
import { CountryMapView, StateMapView } from './MapView.js';
import { CountryInfoView, StateInfoView, CountyInfoView } from './InfoView.js';
import { WidgetsView, CountyWidgetsView } from './WidgetsView.js';
import { GalleryView } from './GalleryView.js';
import { LegendView } from './LegendView.js';

//View Objects
export const countryViews = {
  list: new StateListView(),
  map: new CountryMapView(),
  info: new CountryInfoView(),
  widgets: new WidgetsView(),
  gallery: new GalleryView(),
  legend: new LegendView(),
};

export const stateViews = {
  list: new CountyListView(),
  map: new StateMapView(),
  info: new StateInfoView(),
  widgets: new WidgetsView(),
  gallery: new GalleryView(),
  legend: new LegendView(),
};

export const countyViews = {
  list: null,
  map: null,
  info: new CountyInfoView(),
  widgets: new CountyWidgetsView(),
  legend: null,
};
