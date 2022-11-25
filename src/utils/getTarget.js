import {VALID_TARGET_TYPES} from 'src/constants';
import {getEntity} from 'src/globals';

export const getTarget = (target) => {
  if (typeof target === "string") {
    return getEntity(target);
  } else if (target.type && VALID_TARGET_TYPES.includes(target.type)) {
    return target;
  }

  return null;
}