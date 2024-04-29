// Imports
import Util from '../Utility.js'

// Country Info View
export class CountryInfoView {
  // prettier-ignore
  constructor() {
    // Public Properties
    this.capital;          // Link to access information about the capital
    this.mapButtons;       // Toggles the visualization of information on the map
    this.mapData;          // Object with data used to show information on the map

    // Private Properties 
    this._charts;          // Stores the charts created for a specific location
    this._chartData;       // Object with data used for chart creation
    this._chartButtons;    // Toggles the chart visualization
    this._chartWrappers;   // Container elements where the chart's canvasses are rendered
    this._canvasses;       // Graphic elements where the charts are rendered
  }

  // Public Methods
  update(rootElement, model) {
    // Updates the information from an external action, based on the passed root element and data model.

    this._clear(rootElement)

    this._render(rootElement, model)

    this._getRenderedElements(rootElement)

    this._addEventListeners()

    // console.log(this);
  }

  // Private Methods
  _clear(rootElement) {
    // Removes all the elements (if any) from the root element before rendering new content and clears some property values.

    while (rootElement.firstChild) rootElement.removeChild(rootElement.firstChild)

    this.mapData = {}
    this._charts = {}
    this._chartData = {}
  }

  _render(rootElement, data) {
    // Inserts the template inside the root element.

    rootElement.insertAdjacentHTML('afterbegin', this._template(data))
  }

  _template(data) {
    // Returns a string representing the information section and its elements.

    const { abbrev, capitalId, capitalName, region, regionAbbrev, info } = data // Data model properties
    const { population, density, mostPopulousCounty } = this._formatData(info) // Formatted themes

    return `
        <div class="theme">
            <div class="theme__main">
                <div class="theme__summary">
                    <img class="theme__icon" src="./assets/icon/population.svg" />
                    <div class="theme__text">
                        <p class="theme__title">População estimada</p>
                        <p class="theme__result"><b>${population.result}</b> habitantes <span>(${population.year})</span></p>
                    </div>
                </div>
                <div class="theme__buttons">
                    <button class="theme__button" data-button="chart" data-chart-type="line"
                            data-chart-theme="population" data-chart-status="closed">
                        <img src="./assets/icon/bar-chart.png" />
                    </button>
                </div>
            </div>
            <div class="theme__chart" data-chart-wrapper="population">
                <canvas data-chart-theme="population"></canvas>
            </div>    
        </div>

        <div class="theme">
            <div class="theme__main">
                <div class="theme__summary">
                    <img class="theme__icon" src="./assets/icon/population.svg" />
                    <div class="theme__text">
                        <p class="theme__title">Cidade mais populosa</p>
                        <p class="theme__result">
                            <b>${mostPopulousCounty.name}:</b> ${mostPopulousCounty.result} habitantes <span>(${population.year})</span>
                        </p>
                    </div>
                </div>
                <div class="theme__buttons">
                    <button class="theme__button" data-button="map" data-button-status="" data-theme-name="population">
                        <img src="./assets/icon/brasil.png" />
                    </button>
                    <button class="theme__button" data-button="chart" data-chart-type="bar"
                            data-chart-theme="populationTopTen" data-chart-status="closed">
                        <img src="./assets/icon/bar-chart.png" />
                    </button>
                </div>
            </div>
            <div class="theme__chart" data-chart-wrapper="populationTopTen">
                <canvas data-chart-theme="populationTopTen"></canvas>
            </div>    
        </div>

        <div class="theme">
            <div class="theme__main">
                <div class="theme__summary">
                    <img class="theme__icon" src="./assets/icon/population_density.svg" />
                    <div class="theme__text">
                        <p class="theme__title">Densidade demográfica</p>
                        <p class="theme__result"><b>${density.result}</b> hab/km² <span>(${density.year})</span></p>
                    </div>
                </div>
                <div class="theme__buttons">
                    <button class="theme__button" data-button="chart" data-chart-type="line"
                            data-chart-theme="density" data-chart-status="closed">
                        <img src="./assets/icon/bar-chart.png" />
                    </button>
                </div>
            </div>
            <div class="theme__chart" data-chart-wrapper="density">
                <canvas data-chart-theme="density"></canvas>
            </div>    
        </div>
    `
  }

  // prettier-ignore
  _formatData(data) {
    // Formats the data before its insertion into the template. Also stores chart and map data inside properties.

    /* Data used to populate the template */
    const population = Util.formatTheme(data[0]);                                            // Estimated population of the state
    const density = Util.formatTheme(data[1]);                                               // Population density (inhabitant per square kilometer)
    const countyPopulation = Util.sortByHighestResult(data[2].resultados[0].series);         // Estimated population of each county of the state
    // const countyDensity = Util.sortByHighestResult(data[3].resultados[0].series);         // ...
    const mostPopulousCounty = Util.getFirstLocation(countyPopulation);                      // ...
    // const mostDenseCounty = Util.getFirstLocation(countyDensity);                         // ...

    /* Data used to generate charts */
    this._chartData.population = population.chartData;                                       // ...
    this._chartData.density = density.chartData;                                             // ...
    this._chartData.populationTopTen = Util.formatChartData(countyPopulation.slice(0, 10));  // ...

    /* Data used to show information directly on the map */
    this.mapData.population = countyPopulation;                                              // ...
    // this.mapData.density = countyDensity;                                                 // ...

    return { population, density, mostPopulousCounty /*, mostDenseCounty */ };
  }

  _getRenderedElements(rootElement) {
    //

    this.mapButtons = rootElement.querySelectorAll('[data-button=map]')
    this._chartButtons = rootElement.querySelectorAll('[data-button=chart]')
    this._chartWrappers = [...rootElement.querySelectorAll('[data-chart-wrapper]')]
    this._canvasses = [...rootElement.querySelectorAll('canvas')]
  }

  _addEventListeners() {
    // ...

    this._chartButtons.forEach((button) => {
      //
      button.addEventListener('click', () => {
        //
        const { chartStatus, ...attributes } = button.dataset
        const chartTheme = attributes.chartTheme

        if (chartStatus === 'closed') {
          button.dataset.chartStatus = 'open'
          this._createChart(attributes)
          this._toggleChart(chartTheme)
        } else {
          button.dataset.chartStatus = 'closed'
          this._destroyChart(this._charts[chartTheme]) // Destroys only the chart that corresponds to its button
          this._toggleChart(chartTheme)
        }
      })
    })
  }

  // prettier-ignore
  _createChart(attributes) {
    // Creates a new chart based on the passed attributes. [uses Chart.js library]

    const { chartType, chartTheme } = attributes;  // Attributes from button's dataset

    const chartData = {
      chartType,
      title: this._chartData[chartTheme].title,    // Theme's title
      unit: this._chartData[chartTheme].unit,      // Theme's unit
      labels: this._chartData[chartTheme].labels,  // Years in which the research took place
      values: this._chartData[chartTheme].values,  // Results of the research for each year
    }

    const canvas = this._canvasses.find((canvas) => canvas.dataset.chartTheme === chartTheme).getContext('2d');

    this._charts[chartTheme] = Util.newChart(canvas, chartData);
  }

  _destroyChart(chart) {
    // Destroys the given chart. [uses Chart.js library]

    chart.destroy()
  }

  _toggleChart(chart) {
    // ...

    const chartWrapper = this._chartWrappers.find(
      (wrapper) => wrapper.dataset.chartWrapper === chart
    )

    chartWrapper.classList.toggle('active')
  }
}

// State Info View
export class StateInfoView extends CountryInfoView {
  // Inherited Properties
  constructor() {
    super()
  }

  // renderStateInfo(info) {
  //   //Loader start
  //   toggleLoader(infoSection, infoLoader, true);

  //   //Data request
  //   let data = info;

  //   //DOM manipulation
  //   themesWrapper.innerHTML = `
  //     <div class="theme">
  //       <div class="overview">
  //         <div class="title">
  //           <img src="./assets/icon/population.svg" />
  //           <h4 data-title>${data.population.title}</h4>
  //         </div>
  //         <div class="details">
  //           <p data-value>${data.population.latestValue} pessoas</p>
  //           <p class="theme-year" data-year>[${data.population.latestYear}]</p>
  //           <button data-more>v</button>
  //         </div>
  //       </div>
  //       <div class="chart-container">
  //         <canvas data-type="chart"></canvas>
  //       </div>
  //     </div>

  //     <div class="theme">
  //       <div class="overview">
  //         <div class="title">
  //           <p data-title>Município mais populoso: ${data.chartData.biggestCounty.name}</p>
  //         </div>
  //         <div class="details">
  //           <p data-value>${data.chartData.biggestCounty.population} pessoas</p>
  //           <button data-type="map">Mapa</button>
  //           <button data-more>v</button>
  //         </div>
  //       </div>
  //       <div class="chart-container">
  //         <canvas data-type="chart"></canvas>
  //       </div>
  //     </div>

  //     <div class="theme">
  //       <div class="overview">
  //         <div class="title">
  //           <img src="./assets/icon/population_density.svg" />
  //           <h4 data-title>${data.density.title}</h4>
  //         </div>
  //         <div class="details">
  //           <p data-value>${data.density.latestValue} hab/km²</p>
  //           <p class="theme-year" data-year>[${data.density.latestYear}]</p>
  //           <button data-more>v</button>
  //         </div>
  //       </div>
  //     </div>
  //     `;

  //   //Graphs and themes on map
  //   let toggleChart = infoSection.querySelectorAll('[data-more]'); //trocar p/ data-type="chart"
  //   let toggleTheme = infoSection.querySelectorAll('[data-type="map"]');

  //   toggleChart[0].addEventListener('click', (event) => {
  //     createChart(
  //       'line',
  //       data.population.title,
  //       data.population.unit,
  //       data.population.labels,
  //       data.population.values
  //     );
  //   });

  //   toggleChart[1].addEventListener('click', (event) => {
  //     let status = event.target.dataset.more;

  //     if (status === '') {
  //       toggleChart.forEach((button) => {
  //         button.dataset.more = '';
  //       });

  //       status = 'active';

  //       createChart(
  //         'bar',
  //         data.population.title,
  //         data.population.unit,
  //         data.chartData.labels,
  //         data.chartData.values
  //       );
  //     } else {
  //       console.log(event.target);
  //     }
  //   });

  //   toggleTheme[0].addEventListener('click', (event) => {
  //     let status = event.target.dataset.map;

  //     if (status === '') {
  //       toggleTheme.forEach((button) => {
  //         button.dataset.map = '';
  //       });

  //       status = 'active';

  //       showPopulationOnMap(data.populationPerCounty);
  //       toggleLegend('visible');
  //     } else {
  //       console.log(event.target);
  //     }

  //     //toggle no tema
  //     //valor no data attribute do botao pra gerenciar estados (ativo/inativo) de todos os temas
  //   });

  //   //Loader stop
  //   toggleLoader(infoSection, infoLoader, false);
  // }
}

// County Info View
export class CountyInfoView extends CountryInfoView {
  //Properties
  constructor() {
    super()
  }

  // const formatCountyData = async (countyId) => {
  //   //Data request
  //   let data = await fetchCountyData(countyId);

  //   //Data manipulation
  //   let population = formatIBGEData(data[0]);
  //   let density = formatIBGEData(data[1]);
  //   let area = formatIBGEData(data[2]);
  //   let { latitude, longitude } = data[3][0].centroide;

  //   return { population, density, area, latitude, longitude };
  // };

  // renderCountyInfo(info) {
  //   //Loader start
  //   toggleLoader(weather, weatherLoader, true);
  //   toggleLoader(infoSection, infoLoader, true);

  //   //Data request
  //   let data = info;

  //   //DOM manipulation (weather)
  //   renderWeatherData(data.latitude, data.longitude);

  //   //DOM manipulation (info section)
  //   themesWrapper.innerHTML = `
  //   <div class="theme">
  //     <div class="overview">
  //       <div class="title">
  //         <img src="./assets/icon/population.svg" />
  //         <h4 data-title>${data.population.title}</h4>
  //       </div>
  //       <div class="details">
  //         <p data-value>${data.population.latestValue} pessoas</p>
  //         <p class="theme-year" data-year>[${data.population.latestYear}]</p>
  //         <button data-more>v</button>
  //       </div>
  //     </div>
  //     <div class="chart-container" data-type="chart"></div>
  //   </div>

  //   <div class="theme">
  //     <div class="overview">
  //       <div class="title">
  //         <img src="./assets/icon/population_density.svg" />
  //         <h4 data-title>${data.density.title}</h4>
  //       </div>
  //       <div class="details">
  //         <p data-value>${data.density.latestValue} hab/km²</p>
  //         <p class="theme-year" data-year>[${data.density.latestYear}]</p>
  //         <button data-more>v</button>
  //       </div>
  //     </div>
  //     <div class="chart-container" data-type="chart"></div>
  //   </div>

  //   <div class="theme">
  //     <div class="overview">
  //       <div class="title">
  //         <img src="./assets/icon/area.svg" />
  //         <h4 data-title>${data.area.title}</h4>
  //       </div>
  //       <div class="details">
  //         <p data-value>${data.area.latestValue} km²</p>
  //         <p class="theme-year" data-year>[${data.area.latestYear}]</p>
  //         <button data-more>v</button>
  //       </div>
  //     </div>
  //   </div>`;

  //   //Loader stop
  //   toggleLoader(infoSection, infoLoader, false);
  // }
}
