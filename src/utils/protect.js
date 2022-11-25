import {canAttack, changeTarget, getChar, getCurrentTarget, setState} from 'src/globals';
import {getTargetFrom} from 'src/utils/getTargetFrom';

/**
 *
 */

export const protect = (targetId, heal = false) => {
  const targetEntity = getChar(targetId);

  if (!targetEntity) {
    setState("No Target");
    return;
  }

  // Check if we are already attacking
  const currentTarget = getCurrentTarget();

  if (currentTarget) {
    if(canAttack(currentTarget)) {
      attack(currentTarget);
    }
  } else {
    const enemyTarget = getTargetFrom(targetId);

    // If he is targeting our protected target
    if (enemyTarget && enemyTarget.target === targetId) {
      changeTarget(enemyTarget);
      setState("Protecting");
    } else {
      setState("Watching");
    }
  }

}