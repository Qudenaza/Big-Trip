import AbstractView from './abstract.js';

export default class Smart extends AbstractView {
  constructor() {
    super();
  }

  updateData(update, reRender = true) {
    if (!update) {
      return;
    }

    this._data = Object.assign(
      {},
      this._data,
      update,
    );

    if (reRender) {
      this.updateElement();
    }
  }

  updateElement() {
    const prevElement = this.getElement();

    const parent = prevElement.parentElement;

    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);

    this.restoreHandlers();
  }

  restoreHandlers() {
    throw new Error('Abstract method not implemented: resetHandlers');
  }
}
