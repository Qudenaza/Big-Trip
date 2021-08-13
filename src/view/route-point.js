import AbstractView from './abstract.js';
import { formatDate, calculateDuration } from '../utils/date.js';

const createOffersTemplate = (offers) => {
  if (!offers.length) {
    return '';
  }

  return `<ul class="event__selected-offers">
  ${offers.map((offer) =>
    `<li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
      &plus; &euro;
      <span class="event__offer-price">${offer.price}</span>
    </li>`).join('')}
  </ul>`;
};

const createScheduleTemplate = (from, to) => {
  const duration = calculateDuration(from, to);

  return `<div class="event__schedule">
    <p class="event__time">
      <time class="event__start-time" datetime="${formatDate(from, 'YYYY-MM-DDTHH:mm:ss')}">${formatDate(from, 'HH:mm')}</time>
      &mdash;
      <time class="event__end-time" datetime="${formatDate(to, 'YYYY-MM-DDTHH:mm:ss')}">${formatDate(to, 'HH:mm')}</time>
    </p>
    <p class="event__duration">${duration}</p>
  </div>`;
};

const createRoutePointTemplate = (routePoint) => {
  const { dateFrom, dateTo, type, destination, basePrice, isFavorite, offers } = routePoint;
  const offersTemplate = createOffersTemplate(offers);
  const scheduleTemplate = createScheduleTemplate(dateFrom, dateTo);

  return `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${formatDate(dateFrom, 'YYYY-MM-DD')}">${formatDate(dateFrom, 'MMM DD')}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} to ${destination.name}</h3>
      ${scheduleTemplate}
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      ${offersTemplate}
      <button class="${isFavorite ? 'event__favorite-btn event__favorite-btn--active' : 'event__favorite-btn'}" type="button">
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
  constructor(routePoint) {
    super();

    this._routePoint = routePoint;
    this._clickHandler = this._clickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createRoutePointTemplate(this._routePoint);
  }

  _clickHandler() {
    this._callback.click();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();

    this._callback.favoriteClick();
  }

  setClickHandler(callback) {
    const target = this.getElement().querySelector('.event__rollup-btn');

    this._callback.click = callback;

    target.addEventListener('click', this._clickHandler);
  }

  setFavoriteClickHandler(callback) {
    const target = this.getElement().querySelector('.event__favorite-btn');

    this._callback.favoriteClick = callback;

    target.addEventListener('click', this._favoriteClickHandler);
  }
}