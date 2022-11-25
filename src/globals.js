
// cli functions
export const logMessage = game_log;
export const setState = set_message;

// functions
export const useSkill = use_skill;
export const isOnCooldown = is_on_cooldown;
export const canUse = (...args) => !isOnCooldown(...args);
export const changeTarget = change_target;
export const getChar = get_entity;
export const getEntity = get_entity;
export const isTarget = (target) => target.hasOwnProperty("type");
export const getCurrentTarget = get_targeted_monster;
export const canAttack = can_attack;
