import { createElement } from '../../utils.js';
import { BLANK_TRIP_POINT } from '../../const.js';
import { createDateTemplate } from './date.js';
import { createTypeListTemplate } from './type-list.js';
import { createDestinationTemplate } from './destination.js';
import { createOffersTemplate } from './offers.js';
import { createDescriptionTemplate } from './description.js';

const createEditTemplate = (tripData) => {
  const { basePrice, dateFrom, dateTo, type, destination, offers, isFavorite, isBlank } = tripData;
  const dateTemplate = createDateTemplate(dateFrom, dateTo);
  const typeListTemplate = createTypeListTemplate(type);
  const destinationTemplate = createDestinationTemplate(type, destination.name);
  const offersTemplate = createOffersTemplate(offers);
  const descriptionTemplate = createDescriptionTemplate(destination);

  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      ${typeListTemplate}
      ${destinationTemplate}
      ${dateTemplate}
      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input event__input--price" id="event-price-1" type="text" name="event-price" value=${basePrice}>
      </div>
      <button class="event__save-btn btn btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">${isBlank ? 'Cancel' : 'Delete'}</button>
      ${!isBlank ? `<button class="${isFavorite ? 'event__favorite-btn event__favorite-btn--active' : 'event__favorite-btn'}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Close event</span>
      </button>` : ''}
    </header>
    ${dateTemplate || descriptionTemplate ?
    `<section class="event__details">
      ${offersTemplate}
      ${descriptionTemplate}
    </section>` : ''}
  </form>
</li>`;
};

export default class TripPointEdit {
  constructor(tripData = BLANK_TRIP_POINT) {
    this._tripData = tripData;
    this._element = null;
  }

  getTemplate() {
    return createEditTemplate(this._tripData);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}