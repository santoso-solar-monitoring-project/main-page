import React from 'react';

// Throw on errors if given, otherwise return boolean result
export default function isValidRefObject<T>(
  ref?: React.Ref<T>,
  errors: {
    REF_NULL?: string;
    NO_CURRENT?: string;
    CURRENT_NULL?: string;
  } = {}
): ref is React.RefObject<T> {
  if (ref == null) {
    if (errors.REF_NULL) throw Error(errors.REF_NULL);
    return false;
  } else if (!('current' in ref)) {
    if (errors.NO_CURRENT) throw Error(errors.NO_CURRENT);
    return false;
  } else if (ref.current == null) {
    if (errors.CURRENT_NULL) throw Error(errors.CURRENT_NULL);
    return false;
  }
  return true;
}
