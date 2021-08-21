import { v4 as uuid } from 'uuid';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getUniqueID = () => {
  const id = uuid();

  return id.split('-')[0];
};

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

const removeItem = (items, remove) => {
  const index = items.findIndex((item) => item.id === remove.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    ...items.slice(index + 1),
  ];
};

export { getRandomInteger, getUniqueID, updateItem, removeItem };
