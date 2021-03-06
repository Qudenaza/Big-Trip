import AbstractView from './abstract.js';
import { calculateDuration, formatDate } from '../utils/date.js';

const createRoutePointTemplate = (data) => {
  const { basePrice, type, dateFrom, dateTo, destination: {name: city}, offers, isFavorite } = data;

  return `<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="${formatDate(dateFrom, 'YYYY-MM-DD', false)}">${formatDate(dateFrom, 'MMM  DD', false)}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${type} ${city}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${formatDate(dateFrom, 'YYYY-MM-DD[T]HH:mm')}}">${formatDate(dateFrom, 'HH:mm', false)}</time>
        &mdash;
        <time class="event__end-time" datetime="${formatDate(dateTo, 'YYYY-MM-DD[T]HH:mm')}">${formatDate(dateTo, 'HH:mm', false)}</time>
      </p>
      <p class="event__duration">${calculateDuration(dateFrom, dateTo)}</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
      ${offers.map((offer) => `<li class="event__offer">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </li>`).join('')}
    </ul>
    <button class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
  </li>`;
};

export default class RoutePoint extends AbstractView {
  constructor(data) {
    super();

    this._data = data;
  }

  getTemplate() {
    return createRoutePointTemplate(this._data);
  }

  _editOpenClickHandler() {
    this._callback.editOpenClick();
  }

  _favoriteClickHandler() {
    this._callback.favoriteClick(this._data);
  }

  setEditOpenClickHandler(callback) {
    const target = this.getElement().querySelector('.event__rollup-btn');

    this._callback.editOpenClick = callback;

    target.addEventListener('click', this._editOpenClickHandler.bind(this));
  }

  setFavoriteClickHandler(callback) {
    const target = this.getElement().querySelector('.event__favorite-btn');

    this._callback.favoriteClick = callback;

    target.addEventListener('click', this._favoriteClickHandler.bind(this));
  }
}
