// State List View
export class StateListView {
  constructor() {
    // Public Property
    this.select;
  }

  // Public Methods
  update(rootElement, model) {
    // Updates the list from an external action, based on the passed root element and data model.

    const list = model.list;

    this._clear(rootElement);

    this._render(rootElement, list);

    this._getRenderedElement(rootElement);

    this._addEventListener();
  }

  removePlaceholder() {
    // Removes the placeholder after user's first interaction with the list.

    if (this.select.firstElementChild.value === '') this.select.firstElementChild.remove();
  }

  setValue(id) {
    // Sets a new value to the select based on the passed ID.

    this.select.value = id;
  }

  // Private Methods
  _clear(rootElement) {
    // Removes all list wrappers (if existing) from the root element before rendering a new one.

    while (rootElement.firstChild) rootElement.removeChild(rootElement.firstChild);
  }

  _render(element, list) {
    // Inserts the list wrapper (containg a separator and a select) inside the root element.

    element.appendChild(this._newListWrapper(list));
  }

  _newListWrapper(list) {
    // Wraps separator and select inside a HTML Div Element.

    const listWrapper = document.createElement('div');

    listWrapper.classList.add('list__wrapper');
    listWrapper.append(this._newSeparator(), this._populateSelect(list));

    return listWrapper;
  }

  _populateSelect(list) {
    // Creates a select and populates it with an option for each state of the list.

    const select = this._newSelect('state');

    select.appendChild(this._newOption('Selecione um estado', '')); // Placeholder

    list.forEach((state) => select.appendChild(this._newOption(state.nome, state.id)));

    return select;
  }

  _newSelect(geographicLevel) {
    // Creates a HTML Select Element.

    const select = document.createElement('select');

    select.classList.add('select');
    select.dataset.list = geographicLevel;

    return select;
  }

  _newOption(textContent, value) {
    // Creates a HTML Option Element.

    const option = document.createElement('option');

    option.textContent = textContent;
    option.value = value;

    return option;
  }

  _newSeparator() {
    // Creates a HTML Image Element.

    const separator = document.createElement('img');

    separator.classList.add('separator');
    separator.src = './assets/icon/list_separator.png';

    return separator;
  }

  _getRenderedElement(rootElement) {
    // Stores the select element in a property for further use after the list wrapper is inserted inside the root element.

    this.select = rootElement.querySelector('[data-list=state]');
  }

  _addEventListener() {
    // Adds an event listener to the select.

    this.select.addEventListener('change', (event) => {
      this.removePlaceholder();
    });
  }
}

// County List View
export class CountyListView extends StateListView {
  constructor() {
    // Inherited Property
    super();
  }

  // Private Methods
  _clear(rootElement) {
    // Removes the county list wrapper (if existing) from the root element.

    const hasCountySelect = rootElement.childElementCount > 1;

    if (hasCountySelect) rootElement.lastChild.remove();
  }

  _populateSelect(list) {
    // Creates a select and populates it with an option for each state of the list.

    const select = this._newSelect('county');

    select.appendChild(this._newOption('Selecione um município', '')); // Placeholder

    list.forEach((county) => select.appendChild(this._newOption(county.nome, county.id)));

    return select;
  }

  _getRenderedElement(rootElement) {
    // Stores the select element in a property for further use after the list wrapper is inserted inside the root element.

    this.select = rootElement.querySelector('[data-list=county]');
  }
}
