import * as moment from 'moment-timezone';

import { TIMEZONE, DATE_TIME_FORMAT } from './constants';

export const getDateNowTimeZone = () => {
  const dateNow = parseDateTime().format(DATE_TIME_FORMAT);
  const dateNowTimeZone = new Date(dateNow);
  return dateNowTimeZone;
};

export const parseDateTime = (dateTime = '') => {
  const dateTimeType = dateTime === '' ? moment.now() : dateTime;
  return moment.tz(dateTimeType, TIMEZONE);
};

export const formatDateToString = (date: number | null | Date): string =>
  moment(date).format('YYYY/MM/DD HH:mm:ss');

export const getDate = (date: number | null | Date): string => {
  return moment(date).format('YYYY/MM/DD');
};

export const getTime = (mysqlTime: string) => {
  const momentObj = moment(mysqlTime, 'HH:mm:ss');
  const formattedTime = momentObj.format('HH:mm');
  return formattedTime;
};

export const formatDateToStringV2 = (date: number | null | Date): string =>
  moment(date).format('YYYY/MM/DD HH:mm');
