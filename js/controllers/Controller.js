//Controller SuperClass
class Controller {
  //Properties
  constructor(models, views) {
    //Models
    this._list = models.list;
    this._map = models.map;
    this._altMap = models.altMap;
    this._info = models.info;
    this._widgets = models.widgets;
    this._legend = models.legend;

    //Views
    this._listView = views.list;
    this._mapView = views.map;
    this._infoView = views.info;
    this._widgetsView = views.widgets;
    this._galleryView = views.gallery;
    this._legendView = views.legend;

    //DOM Elements
    this._listRoot = document.querySelector('#lists-root');
    this._mapRoot = document.querySelector('#map-root');
    this._infoRoot = document.querySelector('#info-root');
    this._widgetsRoot = document.querySelector('#widgets-root');
  }

  //Methods
  //ver se é possível adicionar algum método a ser herdado

  //Private Methods
  _disableUi() {
    // console.log('the UI has been disabled');
  }

  _enableUi() {
    // console.log('the UI has been enabled');
  }
}

// Country Controller
export class CountryController extends Controller {
  // Properties
  constructor(models, views, callbackFn) {
    super(models, views);

    //Callback Function
    this._callbackFn = callbackFn;

    //DOM Elements
    this._countryButton = document.querySelector('#country-button');
    this._legend = document.querySelector('#legend');
  }

  // Public Method
  async init() {
    await this._update(); //Views update
  }

  // Private Methods
  async _update() {
    //Updates the models and re-render the views to display its current state

    //List update
    await this._list.update();
    // console.log(this._list);
    this._listView.update(this._listRoot, this._list);

    //Map update
    await this._map.update();
    // console.log(this._map);
    this._mapView.update(this._mapRoot, this._map);

    // Info update
    await this._info.update();
    // console.log(this._info);
    // this._infoView.update(this._infoWrapper, this._info);

    // Widgets update
    await this._widgets.update();
    // console.log(this._widgets);
    this._widgetsView.update(this._widgetsRoot, this._widgets);
    this._galleryView.update(this._widgetsRoot, this._widgets.id);

    this._addEventListeners();
  }

  // prettier-ignore
  _addEventListeners() {
    // ...

    this._countryButton.addEventListener('click', () => {
      this._update();
    });

    this._listView.select.addEventListener('change', () => {
      
      const stateId = this._listView.select.value;  // ID of the chosen state
      this._mapView.highlightPath(stateId);         // Highlights the respective state on map based on the ID's value
      this._callbackFn(stateId);                    // Calls the callback function for the state
    });

    this._widgetsView.thumbnails.forEach((thumbnail, index) => {
      
      thumbnail.addEventListener('click', () => {
        
        this._galleryView.openGallery(thumbnail, index);  // Opens the gallery with the image that represents the thumbnail's index
      });
    });

    this._mapView.map.forEach((state) => {
      
      state.addEventListener('click', () => {
        
        const stateId = state.id;            // ID of the chosen state
        this._listView.removePlaceholder();  // Removes the placeholder of the select after the first interaction with the map
        this._listView.setValue(stateId);    // Sets the select's value based on the ID's value
        this._callbackFn(stateId);           // Calls the callback function for the state
      });
    });

    // this._infoView.mapButtons.forEach((button) => {
    //   button.addEventListener('click', () => {
    //     console.log(button);
    //   });
    // });
  }
}

// State Controller
export class StateController extends Controller {
  // Properties
  constructor(models, views, callbackFn) {
    super(models, views);

    //Callback Function
    this._callbackFn = callbackFn;

    //DOM Elements
    this._legend = document.querySelector('#legend');
  }

  // Public Method
  async update(stateId) {
    // ...

    //List update
    await this._list.update(stateId);
    this._listView.update(this._listRoot, this._list);

    //Map update
    /* The following conditional statement avoids Espírito Santos's (State ID: 32) far away
    island to be rendered, otherwise a very small sized map would be displayed on screen. */

    let map;
    stateId === '32' ? (map = this._altMap) : (map = this._map);

    await map.update(stateId);
    this._mapView.update(this._mapRoot, map);

    // Info update
    await this._info.update(stateId);
    this._infoView.update(this._infoRoot, this._info);

    // Widgets update
    await this._widgets.update(stateId);
    this._widgetsView.update(this._widgetsRoot, this._widgets);
    this._galleryView.update(this._widgetsRoot, stateId);

    this._addEventListeners();
  }

  // Private Methods
  // prettier-ignore
  _addEventListeners() {
    // ...

    this._listView.select.addEventListener('change', () => {
      
      const countyId = this._listView.select.value;  // ID of the chosen county
      this._mapView.highlightPath(countyId);         // Highlights the respective county on map based on the ID's value
      this._callbackFn(countyId);                    // Calls the callback function for the county
    });

    this._widgetsView.thumbnails.forEach((thumbnail, index) => {

      thumbnail.addEventListener('click', () => {

        this._galleryView.openGallery(thumbnail, index);  // Opens the gallery with the image that represents the thumbnail's index
      });
    });

    this._mapView.map.forEach((county) => {

      county.addEventListener('click', () => {

        const countyId = county.id;          // ID of the chosen county
        this._listView.removePlaceholder();  // Removes the placeholder of the select after the first interaction with the map
        this._listView.setValue(countyId);   // Sets the select's value based on the ID's value
        this._callbackFn(countyId);          // Calls the callback function for the county
      });
    });

    this._infoView.mapButtons.forEach((button) => {

      button.addEventListener('click', () => {

        const { buttonStatus, themeName } = button.dataset;

        if (buttonStatus === '') {
          button.dataset.buttonStatus = 'active';
          this._mapView.showTheme(themeName, this._infoView.mapData[themeName]);

        } else {
          button.dataset.buttonStatus = '';
          this._mapView.hideTheme();
        }
      });
    });
  }
}

// County Controller
export class CountyController extends Controller {
  // Properties
  constructor(models, views) {
    super(models, views);
  }

  // Public Method
  async update(countyId) {
    //Stop user interaction
    this._disableUi();

    // Info update
    await this._info.update(countyId);
    // console.log(this._info);
    // this._infoView.update(this._infoRoot, this._info);

    // Widgets update
    await this._widgets.update(this._info.coordinates);
    // console.log(this._widgets);
    this._widgetsView.update(this._widgetsRoot, this._widgets);

    this._addListeners();
    this._enableUi();
  }

  // Private Methods
  _addListeners() {
    //
  }
}
