import { CITIES } from '../../const.js';

export const createDestinationTemplate = (type, city) => `<div class="event__field-group event__field-group--destination">
  <label class="event__label event__type-output" for="event-destination-1">${type} to</label>
  <input class="event__input event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city}" list="destination-list-1">
  <datalist id="destination-list-1">
    ${CITIES.map((item) => `<option value="${item}"></option>`).join('')}
  </datalist>
</div>`;
