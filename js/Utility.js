// Imports
import { countryAttr, stateAttr } from './localData.js'

// Class of utility methods used across several classes
// prettier-ignore
export default class Utility {
  constructor() {}

  // Static Methods
  static getUrls(urlArray) {
    // Returns all URLs from an array of objects.

    const urls = [];

    urlArray.forEach((item) => {

      const url = item.url;

      urls.push(url);
    });

    return urls;
  }

  static updateFromId(urlArray, id) {
    // Updates an array of URLs based on the passed ID.

    const urls = [];

    urlArray.forEach((item) => {

      const templateUrl = item.url;                               // Template URL
      const updatedUrl = templateUrl.replace(/placeholder/, id);  // Replaces placeholder with a valid ID

      urls.push(updatedUrl);
    });

    return urls;
  }

  static updateFromCoords(urlArray, coords) {
    // Updates an URL based on the passed pair of coordinates.

    const { latitude, longitude } = coords;

    const templateUrl = urlArray[0].url;                                                    // Template URL
    const url = templateUrl.replace(/latitude/, latitude).replace(/longitude/, longitude);  // Replaces placeholders with valid coordinates

    return url;
  }

  static transformToSnakeCase(id) {
    // Gets the location name of passed ID and transforms it in a snake case string (e.g. São Paulo -> sao_paulo).

    const attrArray = [countryAttr, ...stateAttr];

    const location = attrArray.find((location) => location.id == id);

    const name = location.name;

    const snakeCaseString = name
      .toLowerCase()                    // Sets all characters to lowercase
      .normalize('NFD')                 // Detaches all characters with diacritical marks (combining characters) into two Unicode characters (e.g. ã -> a~)
      .replace(/[\u0300-\u036f]/g, '')  // Removes all diacritical marks from the string
      .replace(/\s/g, '_');             // Replaces all spaces in the string with underscores

    return snakeCaseString;
  }

  static translateToPtBR(enUSWord) {
    // Translates a dataset value to Brazilian Portuguese in snake case style.

    const ptBRDictionary = {
      flag: 'bandeira',
      emblem: 'brasao_de_armas',
    };

    return ptBRDictionary[enUSWord];
  }

  static formatTheme(dataArray) {
    // Formats information fetched for a single location (country, state or county).
    
    const results = dataArray.resultados[0].series[0].serie;                     // Dataset

    return {
      year: Object.keys(results).slice(-1)[0],                                   // Most recent year of the research
      result: Number(Object.values(results).slice(-1)).toLocaleString('pt-BR'),  // Most recent result of the research, formatted to Brazilian's locale
      chartData: {
        // unit: dataArray.unidade,                                              // Theme's unit (won't be used)
        // name: dataArray.variavel,                                             // Theme's name (won't be used)
        labels: Object.keys(results),                                            // Years in which the research took place
        values: Object.values(results),                                          // Results of the research for each year
      },
    }
  }

  static formatChartData(dataArray) {
    // Gathers the same information from different locations and formats it to be displayed in a chart.

    const labels = [];
    const values = [];

    dataArray.forEach((location) => {
      
      const year = Object.keys(location.serie);            // Most recent year of the research
      
      labels.push(location.localidade.nome.slice(0, -5));  // Location's name (abbreviation removed from the end of the string)
      values.push(location.serie[year]);                   // Most recent result of the research
    });

    return { labels, values };
  }

  static sortByHighestResult(dataArray) {
    // Sorts locations from highest to lowest result inside the array.

    return dataArray.sort((a, b) => {

      const year = Object.keys(a.serie);     // Most recent year of the research

      return b.serie[year] - a.serie[year];
    });
  }

  static getFirstLocation(dataArray) {
    // Returns the formatted attributes of the first location of an array previously sorted.

    const year = Object.keys(dataArray[0].serie);                        // Most recent year of the research

    return {
      name: dataArray[0].localidade.nome.slice(0, -5),                   // Location's name (abbreviation removed from the end of the string)
      result: Number(dataArray[0].serie[year]).toLocaleString('pt-BR'),  // Most recent result of the research
    }  
  }

  static newChart(canvas, dataObj) {
    // Creates a chart inside a HTML Canvas Element, based on the passed data object. [uses Chart.js library]

    /* Chart data */
    const { chartType, unit, name, labels, values } = dataObj;

    /* Global options */
    Chart.defaults.font.family = 'Urbanist';  // Font face
    Chart.defaults.font.size = 14;            // Font size
    Chart.defaults.transitions = false;       // Transition animation
    
    const mainColor = '#03a4a4';              // "Seljuk Blue" accent color
    let bgColor, width;

    if (chartType === 'line') {
      bgColor = '#00000000';                  // Transparent background color
      width = 2.5;                            // Border width of 2.5 pixels
    } else { 
      bgColor = '#03a4a4a6';                  // "Seljuk Blue" background color (35% opacity)
      width = 0;                              // No border
    }
    
    /* Object that gathers both data and options, among other settings */
    const config = {
      type: chartType,
      data: {
        labels: labels,
        datasets: [
          {
            /* Data */
            // label: name,                  // Theme's name inside tooltip (won't be used)
            data: values,
            /* Style */
            backgroundColor: bgColor,
            borderColor: mainColor,
            borderWidth: width,
            pointRadius: 2,
            pointHoverRadius: 4,
          },
        ],
      },
      options: {
        interaction: { intersect: false },
        scales: {
          x: { grid: { display: false } },
          y: { title: { display: false } },
        },
        plugins: { 
          legend: { display: false },
          tooltip: { 
            usePointStyle: true,
            boxHeight: 0,
            boxWidth: 0,
          },
        },
      },
    }

    return new Chart(canvas, config);
  }
}
