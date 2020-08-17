import { Car } from '../models/car';

export const getCarsList = (): Promise<Car[]> => {
  return fetch('/cars')
    .then(res => {
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    })
    .then((carsList: Car[]) => carsList);
};
