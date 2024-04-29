// Imports
import { countryModels, stateModels, countyModels } from './models/summary.js'
import { countryViews, stateViews, countyViews } from './views/summary.js'
import {
  CountryController,
  StateController,
  CountyController,
} from './controllers/Controller.js'

//Controllers
const county = new CountyController(countyModels, countyViews)

const state = new StateController(stateModels, stateViews, county.update.bind(county))

const country = new CountryController(
  countryModels,
  countryViews,
  state.update.bind(state)
) //Main controller

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  country.init()
})
