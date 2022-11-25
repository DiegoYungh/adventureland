import {getEntity} from 'src/globals';

export const getTargetFrom = (entityId) => {
  const source = getEntity(entityId);

  if(source && source.target) {
    if(Array.isArray(source.target)) {
      return getEntity(source.target[0]);
    }

    return getEntity(source.target);
  }

  return null;
}