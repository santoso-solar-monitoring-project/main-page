import React from 'react';

// Throw on errors if given, otherwise return boolean result
export default function isValidRefObject<T>(
  ref?: React.Ref<T>,
  errors: {
    REF_NULL?: any;
    NO_CURRENT?: any;
  } = {}
): ref is React.RefObject<T> {
  if (ref == null) {
    if (errors.REF_NULL) throw Error(errors.REF_NULL);
    return false;
  } else if (!('current' in ref)) {
    if (errors.NO_CURRENT) throw Error(errors.NO_CURRENT);
    return false;
  }
  return true;
}
