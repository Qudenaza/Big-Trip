import SiteMenuView from '../view/site-menu.js';
import DetailView from '../view/detail.js';
import TotalCostView from '../view/total-cost.js';
import FilterView from '../view/filter.js';
import { render, RenderPosition } from '../utils/render.js';

export default class Info {
  constructor(container) {
    this._container = container;
  }

  init(routePoints) {
    this._routePoints = routePoints;

    this._siteMenuComponent = new SiteMenuView();
    this._detailComponent = new DetailView();
    this._totalCostComponent = new TotalCostView(this._routePoints);
    this._filterComponent = new FilterView();

    this._renderDetail();
    this._renderTotalCost();
    this._renderSiteMenu();
    this._renderFilter();
  }

  _renderSiteMenu() {
    const container = this._container.querySelector('.trip-controls__navigation');

    render(container, this._siteMenuComponent, RenderPosition.BEFOREEND);
  }

  _renderDetail() {
    const container = this._container.querySelector('.trip-main__trip-info');

    render(container, this._detailComponent, RenderPosition.BEFOREEND);
  }

  _renderTotalCost() {
    const container = this._container.querySelector('.trip-main__trip-info');

    render(container, this._totalCostComponent, RenderPosition.BEFOREEND);
  }

  _renderFilter() {
    const container = this._container.querySelector('.trip-controls__filters');

    render(container, this._filterComponent, RenderPosition.BEFOREEND);
  }
}