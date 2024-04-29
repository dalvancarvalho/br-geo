// Country/State Widgets View
export class WidgetsView {
  constructor() {
    // Public Property
    this.thumbnails;

    // Private Properties
    this._weather;
    this._weatherDetails;
    this._date;
    this._time;
    this._clock;
  }

  // Public Method
  update(rootElement, model) {
    // Updates the widgets from an external action, based on the passed root element and data model.

    const { timezone, ...data } = model;

    clearInterval(this._clock);

    this._clear(rootElement);

    this._render(rootElement, data);

    this._getRenderedElements(rootElement);

    this._clock = setInterval(() => this._getDateAndTime(timezone), 1000); // Runs every second

    this._addEventListener();
  }

  // Private Methods
  _clear(rootElement) {
    // Removes all the elements (if any) from the root element before rendering new content.

    while (rootElement.firstChild) rootElement.removeChild(rootElement.firstChild);
  }

  _render(rootElement, data) {
    // Inserts the template inside the root element.

    rootElement.insertAdjacentHTML('afterbegin', this._template(data));
  }

  _template(data) {
    // Returns a string representing the widgets section and its elements.

    const { id, ...weather } = this._formatData(data);

    return `
        <div id="main-thumbnails" class="main-thumbnails">
            <img class="main-thumbnail" alt="flag"
                 src="./assets/flag/thumbnail/${id}.png"
                 data-type="flag" data-id="${id}"/>

            <img class="main-thumbnail" alt="emblem"
                 src="./assets/emblem/thumbnail/${id}.png"
                 data-type="emblem" data-id="${id}"/>
        </div>

        <div class="weather">
            <div id="weather-main" class="weather__main">
              <div class="temperature">
                <p class="temperature__text">${weather.celsiusTemp}<span>°C</span></p>
                <img class="temperature__icon" alt="${weather.description}"
                     src="./assets/weather/${weather.icon}.png"/>
              </div>
              <span class="summary">${weather.description}</span>
            </div>

            <div id="weather-details" class="weather__details">
                <p class="detail">Sens. Térmica: ${weather.feelsLikeTemp}°C</p>
                <p class="detail">Umidade de ${weather.humidity}%</p>
                <div class="wind">
                    <p class="detail">Vento: ${weather.kmhWindSpeed} Km/h</p>
                    <img class="wind__icon" src="./assets/icon/wind_arrow_white.svg"
                         style="rotate: ${weather.windDirection}deg"/>
                </div>
            </div>
        </div>

        <div class="date-time">
            <p id="date" class="date"></p>
            <p id="time" class="time"></p>
        </div>
    `;
  }

  _formatData(data) {
    // Returns an object with formatted data to be inserted into the template.

    const { id, main, weather, wind } = data;

    const { temp, feels_like, humidity } = main;
    const { description, icon } = weather;
    const { speed, deg } = wind;

    const MS_TO_KMH = 3.6;
    const WIND_CORRECTION = 180;

    return {
      id,
      celsiusTemp: Math.round(temp),
      feelsLikeTemp: Math.round(feels_like),
      kmhWindSpeed: Math.round(speed * MS_TO_KMH),
      windDirection: deg + WIND_CORRECTION,
      description,
      humidity,
      icon,
    };
  }

  _getRenderedElements(rootElement) {
    // Stores some elements in properties for further use after the template is rendered inside the root element.

    this.thumbnails = rootElement.querySelectorAll('#main-thumbnails > img');
    this._weather = rootElement.querySelector('#weather-main');
    this._weatherDetails = rootElement.querySelector('#weather-details');
    this._date = rootElement.querySelector('#date');
    this._time = rootElement.querySelector('#time');
  }

  _getDateAndTime(timezone) {
    // Defines the date and time of a location based on the passed timezone.

    this._clear(this._time);

    const MINUTE_TO_MILLISECONDS = 60000;
    const SECOND_TO_MILLISECONDS = 1000;

    const localDate = new Date().getTime(); // Local date and time in milliseconds
    const localOffset = new Date().getTimezoneOffset() * -MINUTE_TO_MILLISECONDS; // Local time zone offset in milliseconds
    const noOffset = localDate - localOffset; // Offset removal
    const utcDate = new Date(noOffset).getTime(); // UTC date and time in milliseconds

    const targetOffset = timezone * SECOND_TO_MILLISECONDS; // Target's time zone offset in milliseconds
    const targetDate = utcDate + targetOffset; // Target's date and time in milliseconds
    const dateString = new Date(targetDate).toLocaleDateString('pt-BR'); // Brazilian date format (dd/mm/yyyy)
    const timeString = new Date(targetDate).toLocaleTimeString('pt-BR'); // Brazilian time format (hh:mm:ss)
    const clock = timeString.slice(0, 5).replace(':', '<span>:</span>'); // Seconds suppression and string manipulation for further animation in CSS

    this._date.textContent = dateString;
    this._time.insertAdjacentHTML('afterbegin', clock);
  }

  _addEventListener() {
    // Adds an event listener to the weather widget.

    this._weather.addEventListener('click', () => {
      this._toggleWeatherDetails();
    });
  }

  _toggleWeatherDetails() {
    // Shows/hides complementary weather information.

    this._weatherDetails.classList.toggle('active');
  }
}

// County Widgets View
export class CountyWidgetsView extends WidgetsView {
  constructor() {
    // Inherited Properties
    super();
  }

  // Private Methods
  _template(data) {
    // Returns a string representing the widgets section and its elements.

    const weather = this._formatData(data);

    return `
        <div class="weather">
            <div id="weather-main" class="weather__main">
              <div class="temperature">
                <p class="temperature__text">${weather.celsiusTemp}<span>°C</span></p>
                <img class="temperature__icon" alt="${weather.description}"
                     src="./assets/weather/${weather.icon}.png"/>
              </div>
              <span class="summary">${weather.description}</span>
            </div>

            <div id="weather-details" class="weather__details">
                <p class="detail">Sens. Térmica: ${weather.feelsLikeTemp}°C</p>
                <p class="detail">Umidade de ${weather.humidity}%</p>
                <div class="wind">
                    <p class="detail">Vento: ${weather.kmhWindSpeed} Km/h</p>
                    <img class="wind__icon" src="./assets/icon/wind_arrow_white.svg"
                         style="rotate: ${weather.windDirection}deg"/>
                </div>
            </div>
        </div>

        <div class="date-time">
            <p id="date" class="date"></p>
            <p id="time" class="time"></p>
        </div>
    `;
  }
}
