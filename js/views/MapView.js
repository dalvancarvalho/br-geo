// Imports
import { legendAttributes } from '../legendAttributes.js';

// Country Map View
// prettier-ignore
export class CountryMapView {
  constructor() {
    // Public Property
    this.map;

    // Private Properties
    this._tooltip;
    this._mapButtons;
    this._layersButton;
    this._mapLayers;
    this._inputs;
    this._fullscreenButton;
    this._mapWrapper;
    this._svgs;
    this._paths;
    this._legend;
    this._legendTitle;
    this._legendIntervals;
    this._legendDescription;
    this._inputStatus = {}; // Stores all the input status in order to correctly show the map layers when this view is re-rendered
  }

  // Public Methods
  update(rootElement, model) {
    // Updates the map from an external action, based on the passed root element and data model.

    const { svgMaps, capitalId } = model;

    this._clear(rootElement);
    this._render(rootElement, svgMaps);
    this._getRenderedElements(rootElement);
    this._highlightCapital(capitalId);
    this._setClass();
    this._setAttributes();
    this._addEventListeners(rootElement);
  }

  highlightPath(id) {
    // Highlights the HTML Path Element that contains the passed ID.

    this.map.forEach((path) => path.classList.remove('highlighted'));

    const location = this.map.find((path) => path.id === id);

    location.classList.add('highlighted');
  }

  showTheme(themeName, mapData) {
    // ...

    const mapLocations = this._svgs[0];           // Layer of the map that the user can interact to (states/counties)
    const locationsInput = this._inputs[0];       // Input that toggles the visualization of the states/counties layer
    const layerName = mapLocations.classList[0];  // Name of the state/counties layer

    mapLocations.classList.remove('disabled')     // Activates the layer of the map where the theme is applied
    locationsInput.checked = true;                // Sets the input to match the current state of the states/counties layer
    locationsInput.disabled = true;               // Avoids the user to hide the counties/states of the map while a theme is active
    this._inputStatus[layerName] = 'checked';     // Stores the input status in order to correctly show this map layer when this view is re-rendered

    this._rankMapLocations(themeName, mapData);
    this._createLegend(themeName);
    this._enableMapTooltip();
  }

  hideTheme() {
    // ...

    const locationsInput = this._inputs[0];  // Input that toggles the visualization of the states/counties

    locationsInput.disabled = false;         // Restores the input to its default behavior

    this._clearMapLocations();
    this._destroyLegend();
    this._disableMapTooltip();
  }

  // Private Methods
  _clear(rootElement) {
    // Removes all the elements (if any) from the root element before rendering new content.

    while (rootElement.firstChild) rootElement.removeChild(rootElement.firstChild);
  }

  _render(rootElement, svgMaps) {
    // Inserts the template inside the root element.

    rootElement.insertAdjacentHTML('afterbegin', this._template(svgMaps));
  }

  _template(svgMaps) {
    // Returns a string with the map buttons and the layers that compose the final map.

    return `
        <div id="map-tooltip" class="tooltip"></div>

        <div id="map-buttons" class="map__buttons">
            <div class="layers">
                <button id="layers-button" class="map__button" data-tooltip="Alternar camadas do mapa">
                    <img src="./assets/icon/layers.png" />
                </button>

                <div id="map-layers" class="map__layers">
                    <legend class="layers__legend">Camadas do mapa:</legend>

                    <div class="layer">
                        <input class="layer__status" type="checkbox" id="states" value="country-layer-0"
                               ${this._inputStatus['country-layer-0'] ?? 'checked'} />
                        <label class="layer__text" for="states">Estados</label>
                    </div>

                    <div class="layer">
                        <input class="layer__status" type="checkbox" id="regions" value="country-layer-1"
                               ${this._inputStatus['country-layer-1'] ?? 'checked'} />
                        <label class="layer__text" for="regions">Regiões</label>
                    </div>
                </div>
            </div>

            <button id="fullscreen-button" class="map__button" data-tooltip="Ver em mapa tela cheia">
                <img src="./assets/icon/fullscreen.png" />
            </button>
        </div>

        <div id="map-wrapper" class="map__wrapper">
            ${svgMaps[0]}
            ${svgMaps[1]}
            ${svgMaps[2]}
        </div>
    `;
  }

  _getRenderedElements(rootElement) {
    // Stores some elements in properties for further use after the template is rendered inside the root element.

    this._tooltip = rootElement.querySelector('#map-tooltip');                   // ...
    this._mapButtons = rootElement.querySelectorAll('button');                   // ...
    this._layersButton = rootElement.querySelector('#layers-button');            // Button that toggles the list of map layers
    this._mapLayers = rootElement.querySelector('#map-layers');                  // Element containing checkboxes to show/hide the map layers
    this._inputs = rootElement.querySelectorAll('input');                        // Nodelist of checkboxes that toggle the visualization of map layers
    this._fullscreenButton = rootElement.querySelector('#fullscreen-button');    // Button that toggles the fullscreen visualization of the map
    this._mapWrapper = rootElement.querySelector('#map-wrapper');                // HTML Div Element where the map is rendered
    this._svgs = rootElement.querySelectorAll('svg');                            // Nodelist of HTML SVG Elements (layers) that compose the map
    this.map = [...this._svgs[0].querySelectorAll('path')];                      // Array of HTML Path Elements that the user can interact to (first map layer)
    this._paths = [...rootElement.querySelectorAll('path')];                     // Array of all HTML Path Elements that compose the map
    this._legend = rootElement.querySelector('#map-legend');                     // ...
    this._legendTitle = rootElement.querySelector('#legend-title');              // ...
    this._legendIntervals = rootElement.querySelector('#legend-intervals');      // ...
    this._legendDescription = rootElement.querySelector('#legend-description');  // ...
  }

  _highlightCapital(capitalId) {
    // Highlights the capital in the map.

    const capital = this._paths.find((path) => path.id == capitalId);

    capital.classList.add('highlighted');
  }

  _setClass() {
    // Sets classes to each HTML SVG Element (map layer) based on the stored status of its corresponding input.

    this._svgs.forEach((svg, index) => {

      const layerName = `country-layer-${index}`;

      this._inputStatus[layerName] === 'checked' || this._inputStatus[layerName] == undefined // If the input status is undefined, it means it was never toggled
        ? svg.classList.add(layerName)
        : svg.classList.add(layerName, 'disabled');
    });
  }

  _setAttributes() {
    // Removes predefined 'width', 'height' and 'baseProfile' attributes and prevents undesired behavior of the 'stroke' attribute.

    this._svgs.forEach((svg) => {
      svg.removeAttribute('width');
      svg.removeAttribute('height');
      svg.removeAttribute('baseProfile');
    });

    this._paths.forEach((path) => path.setAttribute('vector-effect', 'non-scaling-stroke'));
  }

  _addEventListeners(rootElement) {
    // ...

    this.map.forEach((location) => {
      //
      location.addEventListener('click', () => {
        //
        const id = location.id;

        this.highlightPath(id);
      });
    });

    this._mapButtons.forEach((button) => {

      let timeout;

      // ...
      button.addEventListener('mouseover', () => {

        timeout = setTimeout(() => {

          const { left, top, width, height } = button.getBoundingClientRect();

          this._tooltip.textContent = button.dataset.tooltip;
          this._tooltip.style.left = `${left + width / 2}px`;
          this._tooltip.style.top = `${top + height / 2}px`;
          this._tooltip.classList.add('active');
        }, 500);
      });

      // ...
      button.addEventListener('mouseleave', () => {
        clearInterval(timeout);
        this._tooltip.classList.remove('active');
      });

      button.addEventListener('click', () => {
        clearInterval(timeout);
        this._tooltip.classList.remove('active');
      });
    });

    this._layersButton.addEventListener('click', () => {
      this._mapLayers.classList.toggle('active');
    });

    this._inputs.forEach((input) => {

      input.addEventListener('click', () => {

        const layerName = input.value;
        const layer = rootElement.querySelector(`.${layerName}`);

        if (input.checked) {
          layer.classList.remove('disabled');
          this._inputStatus[layerName] = 'checked';
        } else {
          layer.classList.add('disabled');
          this._inputStatus[layerName] = '';
        }
      });
    });

    this._fullscreenButton.addEventListener('click', () => {
      console.log('fullscreen!');
    });
  }

  _rankMapLocations(themeName, mapData) {
    // Gives a classification range in the form of a class-name to each path element of the map and sets the value of its dataset attributes.

    const { unit, intervals } = legendAttributes[themeName];

    this._clearMapLocations();                                         // Removes the previous themes (if any) from the path elements

    mapData.forEach((location) => {

      const id = location.localidade.id;                               // ID of the current location
      const path = this.map.find((path) => path.id === id);            // Map's path element that corresponds to the current location
      const year = Object.keys(location.serie);                        // Most recent year of the research
      const result = location.serie[year];                             // Most recent result of the research
      const locationName = location.localidade.nome.slice(0, -5);      // Location's name (abbreviation removed from the end of the string)
      const formattedResult = Number(result).toLocaleString('pt-BR');  // Most recent result of the research, formatted to Brazilian's locale

      const interval = intervals.find((interval) => interval.start < result && interval.end > result);

      path.classList.add(interval.name);
      path.dataset.intervalName = interval.name;
      path.dataset.tooltip = `<b>${locationName}:</b> ${formattedResult} ${unit}`; // Information to be shown when the cursor hovers a path in the map
    });
  }

  _clearMapLocations() {
    // ...

    this.map.forEach((path) => {
      path.dataset.intervalName = '';
      path.dataset.filtered = ''
      path.dataset.tooltip = '';
      path.style.pointerEvents = 'all'
    });

    this._paths.forEach((path) => {
      path.classList.contains('highlighted')
      ? (path.classList.value = 'highlighted')
      : (path.classList.value = '');
    });
  }

  _createLegend(themeName) {
    // Creates an interactive legend that can be filtered by the intervals found in the map.

    const { title, intervals: intervalAttributes } = legendAttributes[themeName];
    
    this._clear(this._legendIntervals);             // Removes all the intervals (if any) of the legend before rendering new ones
    this._legendTitle.textContent = title;          // Legend title
    const mapIntervals = this._sortMapIntervals();  // Array of the intervals found in the current map

    mapIntervals.forEach((intervalName) => {        // DOM elements creation

      const { label, description } = intervalAttributes.find((interval) => interval.name === intervalName);

      const intervalLabel = document.createElement('p');
      intervalLabel.classList.add('interval__label');
      intervalLabel.textContent = label;

      const intervalColor = document.createElement('div');
      intervalColor.classList.add('interval__color', intervalName);
      intervalColor.dataset.intervalName = intervalName;
      intervalColor.dataset.tooltip = description;
      intervalColor.dataset.filter;

      const interval = document.createElement('div');
      interval.classList.add('interval');
      interval.append(intervalLabel, intervalColor);

      this._legendIntervals.appendChild(interval);
    });

    this._updateLegendDescription();
    this._createLegendFilter(intervalAttributes);
    this._showLegend();
  }

  _sortMapIntervals() {
    // Returns an array with all the intervals found in the map sorted in crescent order (only unique values).

    const mapIntervals = [];

    this.map.forEach((path) => {
      const intervalName = path.dataset.intervalName;
      if (!mapIntervals.includes(intervalName)) mapIntervals.push(intervalName);
    });

    mapIntervals.sort();

    return mapIntervals;
  }

  _addFilter(interval) {
    // ...

    const intervalName = interval.dataset.intervalName;

    interval.dataset.filter = 'active';
    interval.classList.add('scale', 'filtered');

    this._paths.forEach((path) => {

      if (path.dataset.intervalName === intervalName) {
        path.classList.add('filtered');
        path.dataset.filtered = 'true';
      } else {
        path.classList.add('not-filtered');
        path.style.pointerEvents = 'none';
      }
    });
  }

  _removeFilter(interval) {
    // ...

    interval.dataset.filter = '';
    interval.classList.remove('scale', 'filtered');

    this._paths.forEach((path) => {
      path.classList.remove('filtered', 'not-filtered');
      path.dataset.filtered = '';
    });

    this.map.forEach((path) => (path.style.pointerEvents = 'all'));
  }

  _createLegendFilter(intervalAttributes) {
    // ...

    const legendIntervals = [...this._legend.querySelectorAll('[data-interval-name]')];  // Intervals of the legend

    legendIntervals.forEach((interval) => {

      interval.addEventListener('click', () => {

        const intervalName = interval.dataset.intervalName;
        const { description } = intervalAttributes.find((interval) => interval.name === intervalName);

        if (interval.dataset.filter !== 'active') {

          const activeInterval = legendIntervals.find((interval) => interval.dataset.filter === 'active');
          if (activeInterval) this._removeFilter(activeInterval);

          this._addFilter(interval);
          this._updateLegendDescription(description);

        } else {

          this._removeFilter(interval);
          this._updateLegendDescription();
        }
      });
    });
  }

  _updateLegendDescription(description) {
    // ...

    const filteredPaths = this.map.filter((path) => path.dataset.filtered === 'true');
    const filterCount = filteredPaths.length;

    if (filterCount === 0) this._legendDescription.textContent = 'Clique no intervalo desejado para filtrar';
    else {
      filterCount === 1
        ? (this._legendDescription.textContent = `Exibindo apenas ${description} (${filterCount} resultado)`)
        : (this._legendDescription.textContent = `Exibindo apenas ${description} (${filterCount} resultados)`);
    }
  }

  _showLegend() {
    // ...

    this._legend.classList.add('active');
  }

  _destroyLegend() {
    // ...

    this._legend.classList.remove('active');
  }

  _enableMapTooltip() {
    // ...

    const legendIntervals = this._legend.querySelectorAll('[data-interval-name]');

    legendIntervals.forEach((interval) => {

      let timeout;

      interval.addEventListener('mouseover', () => {

        timeout = setTimeout(() => {

        const { left, top, width, height } = interval.getBoundingClientRect();

          this._tooltip.textContent = interval.dataset.tooltip;
          this._tooltip.style.left = `${left + width / 2}px`;
          this._tooltip.style.top = `${top + height / 2}px`;
          this._tooltip.classList.add('active');
        }, 500);
      });

      interval.addEventListener('mouseleave', () => {
        clearInterval(timeout);
        this._tooltip.classList.remove('active');
      });

      interval.addEventListener('click', () => {
        clearInterval(timeout);
        this._tooltip.classList.remove('active');
      });
    })

    this.map.forEach((path) => {

      path.addEventListener('mouseover', () => {
        this._tooltip.innerHTML = path.dataset.tooltip;
        this._tooltip.classList.add('active');
      });

      path.addEventListener('mousemove', (event) => {
        this._tooltip.style.left = `${event.pageX}px`;
        this._tooltip.style.top = `${event.pageY}px`;
      });

      path.addEventListener('mouseleave', () => {
        this._tooltip.classList.remove('active');
      });
    });
  }

  _disableMapTooltip() {
    // ...

    this.map.forEach((path) => {
      path.addEventListener('mouseover', () => this._tooltip.classList.remove('active'));
    });
  }
}

// State Map View
export class StateMapView extends CountryMapView {
  constructor() {
    // Inherited Properties
    super();
  }

  // Private Methods
  _template(svgMaps) {
    // Returns a string with the map buttons and the layers that compose the final map.

    return `
        <div id="map-tooltip" class="tooltip"></div>

        <div id="map-buttons" class="map__buttons">
            <div class="layers">
                <button id="layers-button" class="map__button" data-tooltip="Alternar camadas do mapa">
                    <img src="./assets/icon/layers.png" />
                </button>

                <div id="map-layers" class="map__layers">
                    <legend class="layers__legend">Camadas do mapa:</legend>

                    <div class="layer">
                        <input class="layer__status" type="checkbox" id="counties" value="state-layer-0"
                               ${this._inputStatus['state-layer-0'] ?? 'checked'} />
                        <label class="layer__text" for="counties">Municípios</label>
                    </div>

                    <div class="layer">
                        <input class="layer__status" type="checkbox" id="microregions" value="state-layer-1"
                               ${this._inputStatus['state-layer-1'] ?? 'checked'} />
                        <label class="layer__text" for="microregions">Microrregiões</label>
                    </div>

                    <div class="layer">
                        <input class="layer__status" type="checkbox" id="mesoregions" value="state-layer-2"
                               ${this._inputStatus['state-layer-2'] ?? 'checked'} />
                        <label class="layer__text" for="mesoregions">Mesorregiões</label>
                    </div>
                </div>
            </div>

            <button id="fullscreen-button" class="map__button" data-tooltip="Ver mapa em tela cheia">
                <img src="./assets/icon/fullscreen.png" />
            </button>
        </div>

        <div id="map-wrapper" class="map__wrapper">
            ${svgMaps[0]}
            ${svgMaps[1]}
            ${svgMaps[2]}
            ${svgMaps[3]}
        </div>

        <div id="map-legend" class="map__legend">
            <p id="legend-title" class="legend__title"></p>
            <div id="legend-intervals" class="legend__intervals"></div>
            <p id="legend-description" class="legend__description"></p>
        </div>
    `;
  }

  _setClass() {
    // Sets classes to each HTML SVG Element (map layer) based on the stored status of its corresponding input.

    this._svgs.forEach((svg, index) => {
      const layerName = `state-layer-${index}`;

      this._inputStatus[layerName] === 'checked' || this._inputStatus[layerName] == undefined // If the input status is undefined, it means it was never toggled
        ? svg.classList.add(layerName)
        : svg.classList.add(layerName, 'disabled');
    });
  }
}
