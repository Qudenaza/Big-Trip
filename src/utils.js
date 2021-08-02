import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const calculateDuration = (from, to) => {
  const ms = dayjs(to).diff(dayjs(from));

  let minutes = parseInt(((ms / (1000 * 60)) % 60), 10),
    hours = parseInt(((ms / (1000 * 60 * 60)) % 24), 10),
    days = parseInt((ms / (1000 * 60 * 60 * 24)), 10);

  days = (days < 10) ? `0${days}` : days;
  hours = (hours < 10) ? `0${hours}` : hours;
  minutes = (minutes < 10) ? `0${minutes}` : minutes;

  return `${days === '00' ? '' : `${days}D`} ${hours === '00' ? '00H' : `${hours}H`} ${minutes === '00' ? '00M' : `${minutes}M`}`;
};

const humanizeDates = () => {
  dayjs.extend(utc);

  const dateFrom = dayjs.utc().add(getRandomInteger(1, 100), 'days').format();
  const dateTo = dayjs.utc(dateFrom).add(getRandomInteger(0, 20), 'days').add(getRandomInteger(2, 24), 'hours').add(getRandomInteger(1, 60), 'minutes').format();

  return [dateFrom, dateTo];
};

const formatDate = (date, format) => dayjs(date).format(format);

const isEmptyObject = (obj) => {
  for (const i in obj) {
    if (obj[i]) {
      return false;
    }
  }
  return true;
};

export { getRandomInteger, formatDate, calculateDuration, humanizeDates, isEmptyObject };
