import { sort } from './sort.js';
import { SORT_TYPE } from '../const.js';

export const calculateTotalCost = (data) => data.reduce((sum, current) => sum + current.totalPrice , 0);

export const calculateRouteWay = (data) => sort[SORT_TYPE.DAY](data).map((point) => point.destination.name);

export const calculateRouteDates = (data) => {
  if (!data.length) {
    return [];
  }

  const sortedData = sort['day'](data);

  if (sortedData.length > 1) {
    return [sortedData[0].dateFrom, sortedData[sortedData.length - 1].dateTo];
  }

  return [sortedData[0].dateFrom];
};

export const handlePseudo = (remove)  => {
  const elements = document.querySelectorAll('.page-body__container');

  if (remove) {
    elements.forEach((element) => element.classList.add('hide-pseudo'));

    return;
  }

  elements.forEach((element) => element.classList.remove('hide-pseudo'));
};

export const isOnline = () => window.navigator.onLine;
