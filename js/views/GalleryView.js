// Imports
import Util from '../Utility.js';

// Gallery View
export class GalleryView {
  constructor() {
    // Private Properties
    this._gallery;
    this._downloadButton;
    this._downloadList;
    this._downloadOptions;
    this._closeButton;
    this._image;
    this._thumbnails;
    this._navButtons;
    this._previousImageButton;
    this._nextImageButton;
    this._keyboardEvents;
    this._imageIndex = 0;
  }

  // Public Methods
  update(rootElement, id) {
    // Updates the gallery from an external action, based on the passed root element and ID.

    this._render(rootElement, id);

    this._getRenderedElements(rootElement);

    this._addEventListeners();
  }

  openGallery(thumbnail, index) {
    // Opens the gallery from an external action and sets it to display the correct image.

    this._imageIndex = index;

    this._toggleActiveClass(this._gallery);

    this._updateImage(thumbnail);

    this._galleryNavigation();
  }

  // Private Methods
  _render(rootElement, id) {
    // Inserts the template as the last child of the root element.

    rootElement.insertAdjacentHTML('beforeend', this._template(id));
  }

  _template(id) {
    // Returns a string representing the gallery and its elements.

    return `
        <div id="gallery" class="gallery">

            <div class="button-wrapper">
                <div class="download">
                    <button id="download-button" class="download__button">
                        <p class="download__text">Download</p>
                        <img class="download__icon" src="./assets/icon/download.png" />
                    </button>

                    <div id="download-list" class="download__list">
                        <a class="download__option" href="" data-type="" data-format="svg" data-id="${id}">
                            <p class="download__text">Vetor</p>
                            <img class="download__icon" src="./assets/icon/svg_file.png" /> 
                        </a>

                        <a class="download__option" href="" data-type="" data-format="png" data-id="${id}">
                            <p class="download__text">Imagem</p>
                            <img class="download__icon" src="./assets/icon/png_file.png" /> 
                        </a>
                    </div>
                </div>
                <button id="close-button" class="close-button">&#x2715</button>
            </div>

            <div id="nav-buttons" class="nav-buttons">
                <div id="previous-button" class="nav-button previous" data-nav-button="previous">
                    <img class="nav__icon" src="./assets/icon/gallery_previous_2.png" />
                </div>

                <div id="next-button" class="nav-button next" data-nav-button="next">
                    <img class="nav__icon" src="./assets/icon/gallery_next_2.png" />
                </div>
            </div>

            <img id="image" class="image" alt="" src="" loading="lazy"/>

            <div id="thumbnails" class="thumbnails">
                <div class="thumbnail" data-type="flag" data-id="${id}">
                    <img class="thumbnail__image" alt="flag"
                         src="./assets/flag/thumbnail/${id}.png" />
                    <p class="thumbnail__description">Bandeira</p>
                </div>

                <div class="thumbnail" data-type="emblem" data-id="${id}">
                    <img class="thumbnail__image" alt="emblem"
                         src="./assets/emblem/thumbnail/${id}.png" />
                    <p class="thumbnail__description">Brasão de armas</p>
                </div>
            </div>

        </div>
    `;
  }

  _getRenderedElements(rootElement) {
    // Stores some gallery elements in properties for further use after the template is rendered inside the root element.

    this._gallery = rootElement.querySelector('#gallery');
    this._downloadButton = rootElement.querySelector('#download-button');
    this._downloadList = rootElement.querySelector('#download-list');
    this._closeButton = rootElement.querySelector('#close-button');
    this._image = rootElement.querySelector('#image');
    this._previousImageButton = rootElement.querySelector('#previous-button');
    this._nextImageButton = rootElement.querySelector('#next-button');
    this._downloadOptions = rootElement.querySelectorAll('#download-list > a');
    this._thumbnails = rootElement.querySelectorAll('#thumbnails > div');
    this._navButtons = rootElement.querySelectorAll('#nav-buttons > div');
  }

  // prettier-ignore
  _addEventListeners() {
    // Adds event listeners to several gallery elements.

    document.removeEventListener('keydown', this._keyboardEvents);

    document.addEventListener('keydown', this._keyboardEvents = (event) => {

      const key = event.code;

      switch (key) {
        case 'Escape':
          if (this._downloadList.classList.contains('active')) {
            this._toggleActiveClass(this._downloadButton, this._downloadList);
          } else {
            this._closeGallery();
          }
          break;
          
        case 'ArrowRight':
          if (
            this._gallery.classList.contains('active') &&
            !this._downloadList.classList.contains('active')
          ) {
            this._imageIndex++;
            this._galleryNavigation();
          }
          break;

        case 'ArrowLeft':
          if (
            this._gallery.classList.contains('active') &&
            !this._downloadList.classList.contains('active')
          ) {
            this._imageIndex--;
            this._galleryNavigation();
          }
          break;

        default:
          return;
      }
    });

    this._downloadButton.addEventListener('click', () => {
      this._toggleActiveClass(this._downloadButton, this._downloadList);
    });

    this._downloadOptions.forEach((option) => {
      option.addEventListener('click', () => {
        this._downloadFile(option);
        this._toggleActiveClass(this._downloadButton, this._downloadList);
      });
    });

    this._closeButton.addEventListener('click', () => {
      this._closeGallery();
    });

    this._navButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const navButton = button.dataset.navButton;

        navButton === 'previous' ? this._imageIndex-- : this._imageIndex++;

        this._galleryNavigation();
      });
    });

    this._thumbnails.forEach((thumbnail, index) => {
      thumbnail.addEventListener('click', () => {
        this._imageIndex = index;
        this._updateImage(thumbnail);
        this._galleryNavigation();
      });
    });

    this._gallery.addEventListener('click', (event) => {
      if (event.target !== this._downloadButton) {
        this._downloadButton.classList.remove('active');
        this._downloadList.classList.remove('active');
      }
    });
  }

  _updateImage(thumbnail) {
    // Updates the gallery image, either via mouse or keyboard action.

    const { type, id } = thumbnail.dataset;

    this._setImageAttributes(type, id);
    this._highlightThumbnail(type);
    this._setDownloadType(type);
  }

  _setImageAttributes(type, id) {
    // Sets the values of the gallery image attributes.

    this._image.src = `./assets/${type}/${id}.png`; // Path of the image displayed in the gallery
    this._image.alt = this._setName(type, id); // Description of the image displayed in the gallery
  }

  _setName(type, id) {
    // Sets the name that the downloaded file and the alternate text of the gallery image receives.

    const ptBRType = Util.translateToPtBR(type);
    const locationName = Util.transformToSnakeCase(id);

    return `${ptBRType}_${locationName}`;
  }

  _setDownloadType(type) {
    // Sets the type of the file that can be downloaded (e.g. flag).

    this._downloadOptions.forEach((option) => (option.dataset.type = type));
  }

  _downloadFile(option) {
    // Downloads a file that represents the current image displayed in the gallery.
    // The attributes needed to compose the file are stored inside each download option.

    const { type, id, format } = option.dataset;

    option.href = `./assets/${type}/download/${id}.${format}`;
    option.download = this._setName(type, id);
  }

  _highlightThumbnail(type) {
    // Highlights a thumbnail everytime it is selected, either via mouse or keyboard action.

    this._thumbnails.forEach((thumbnail) => {
      thumbnail.classList.remove('active');

      if (thumbnail.dataset.type === type) thumbnail.classList.add('active');
    });
  }

  _galleryNavigation() {
    // Defines the rules of how the image navigation works inside the gallery.

    const MIN_INDEX = 0;
    const MAX_INDEX = this._thumbnails.length - 1;

    if (this._imageIndex <= MIN_INDEX) {
      this._imageIndex = MIN_INDEX;
      this._previousImageButton.classList.add('disabled');
      this._nextImageButton.classList.remove('disabled');
    } else if (this._imageIndex >= MAX_INDEX) {
      this._imageIndex = MAX_INDEX;
      this._previousImageButton.classList.remove('disabled');
      this._nextImageButton.classList.add('disabled');
    } else {
      this._previousImageButton.classList.remove('disabled');
      this._nextImageButton.classList.remove('disabled');
    }

    const thumbnail = this._thumbnails[this._imageIndex];
    this._updateImage(thumbnail);
  }

  _toggleActiveClass(...elements) {
    // Toggles the class 'active' for all elements passed to this method.

    elements.forEach((element) => element.classList.toggle('active'));
  }

  _closeGallery() {
    // Hides the gallery.

    this._gallery.classList.remove('active');
  }
}
