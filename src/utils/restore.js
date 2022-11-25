/**
 *
 */
import {getTarget} from 'src/utils/getTarget';
import {canUse} from 'src/globals';

const getValueType = (value) => typeof value === 'string' ? 'percentage' : 'literal';

/**
 * @param {function} action
 * @param {'mp' | 'hp'} param
 * @param {Object} target
 * @param value
 * @param {'LT' | 'LTE' | 'GT' | 'GTE'} strategy
 * @param {'literal' | 'percentage'} valueType
 */
const restore = ({ action, param, target, value, strategy , valueType  }) => {
  let currentValue = target[param];

  if( valueType === 'percentage' ) {
    value = Number(value.replace('%', ''));
    currentValue = (target[param] / target[`max_${param}`]) * 100;
  }

  switch (strategy) {
    case 'LT':
      currentValue < value && action();
      break;
    case 'LTE':
      currentValue <= value && action();
      break;
    case 'GT':
      currentValue > value && action();
      break;
    case 'GTE':
      currentValue >= value && action();
      break;
  }
}

/**
 * @param {'LT' | 'LTE' | 'GT' | 'GTE'} strategy
 * @param value
 */
export const restoreMp = ({ value, strategy = 'LTE'  }) => {
  if(!canUse("use_mp")){
    return;
  }

  restore({
    param: 'mp',
    target: character,
    valueType: getValueType(value),
    strategy,
    value,
    action: () => {
      use_skill("use_mp");
    }
  });
}

/**
 * @param {'LT' | 'LTE' | 'GT' | 'GTE'} strategy
 * @param value
 */
export const restoreHp = ({ value, strategy= 'LTE'  }) => {
  if(!canUse("use_hp")){
    return;
  }

  restore({
    param: 'hp',
    target: character,
    valueType: getValueType(value),
    strategy,
    value,
    action: () => {
      use_skill("use_hp");
    }
  });
}