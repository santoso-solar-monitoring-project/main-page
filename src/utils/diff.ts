import { Pair } from 'utils/Pair';
import identity from './identity';

export const diff = <T>(d: Pair<T>, convert: (x: T) => any = identity) =>
  +convert(d[1]) - +convert(d[0]);
