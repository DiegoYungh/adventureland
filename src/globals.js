// cli functions
const logMessage = game_log;
const setState = set_message;

// functions
const useSkill = use_skill;
const isOnCooldown = is_on_cooldown;
const canUse = (...args) => !isOnCooldown(...args);