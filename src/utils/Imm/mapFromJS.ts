import { fromJS, isKeyed } from 'immutable';
import { ImmMapType } from '.';

export function mapFromJS<T extends object>(js: T): ImmMapType<T> {
  return fromJS(js, function(this: { key: any }, key, value, path) {
    return isKeyed(value) ? value.toMap() : value.toList().toMap();
  });
}
