import RouteModel from '../model/route.js';
import { isOnline } from '../utils/common.js';

const getSyncedPoints = (items) => items.filter(({success}) => success).map(({payload}) => payload.point);

const createStoreStructure = (items) => items.reduce((acc, current) => Object.assign({}, acc, {[current.id]: current}), {});


export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getPoints() {
    if (isOnline()) {
      return this._api.getPoints()
        .then((points) => {
          const items = createStoreStructure(points.map(RouteModel.adaptToServer));

          this._store.setItems(items, 'points');

          return points;
        });
    }

    const storePoints = Object.values(this._store.getItems('points'));

    return Promise.resolve(storePoints.map(RouteModel.adaptToClient));
  }

  getOffers() {
    if (isOnline()) {
      return this._api.getOffers()
        .then((offers) => {
          this._store.setItems(offers, 'offers');
          return offers;
        });
    }

    const storeOffers = this._store.getItems('offers');

    return Promise.resolve(storeOffers);
  }

  getDestinations() {
    if (isOnline()) {
      return this._api.getDestinations()
        .then((destinations) => {
          this._store.setItems(destinations, 'destinations');

          return destinations;
        });
    }

    const storeDestinations = this._store.getItems('destinations');

    return Promise.resolve(storeDestinations);
  }

  updatePoint(point) {
    if (isOnline()) {
      return this._api.updatePoint(point)
        .then((updatedPoint) => {
          this._store.setItem('points', updatedPoint.id, RouteModel.adaptToServer(updatedPoint));

          return updatedPoint;
        });
    }

    this._store.setItem('points', point.id, RouteModel.adaptToServer(Object.assign({}, point)));

    return Promise.resolve(point);
  }

  addPoint(point) {
    if (isOnline()) {
      return this._api.addPoint(point)
        .then((newPoint) => {
          this._store.setItem('points', newPoint.id, RouteModel.adaptToServer(newPoint));

          return newPoint;
        });
    }

    return Promise.reject(new Error('Add point failed'));
  }

  deletePoint(point) {
    if (isOnline()) {
      return this._api.deletePoint(point)
        .then(() => this._store.removeItem('points', point.id));
    }

    return Promise.reject(new Error('Delete point failed'));
  }

  sync() {
    if (isOnline()) {
      const storePoints = Object.values(this._store.getItems('points'));

      return this._api.sync(storePoints)
        .then((response) => {
          const createdPoints = getSyncedPoints(response.created);
          const updatedPoints = getSyncedPoints(response.updated);

          const items = createStoreStructure([...createdPoints, ...updatedPoints]);

          this._store.setItems(items, 'points');
        });
    }

    return Promise.reject(new Error('Sync data failed'));
  }
}
