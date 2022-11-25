// Overrides
import {setState, logMessage} from 'src/globals';

//
var autoHeal=true
var healTargets = [
	"KobeChi",
	"ShiroChi"
];

function restoreMpIfLowerThan (min, minItem, minRegen) {
	const mpDiff = character.max_mp - character.mp;
	
	if(!is_on_cooldown("use_mp") && mpDiff > min) {
		if (mpDiff > minItem) {
			use_skill("use_mp");
		} else {
			use_skill("regen_mp");
		}
	}
}

function restoreHpIfLowerThan (min) {
	if(!is_on_cooldown("use_hp") && (character.max_hp - character.hp) > min) {
		use_skill("use_hp");
	}
}
	
const getDistance = (source, target) => {
	const sourceEntity = get_entity(source);
	const targetEntity = get_entity(target);
	
	return (
		Math.abs(sourceEntity.x - targetEntity.x) 
		+ Math.abs(sourceEntity.y - targetEntity.y)
	);
}

setInterval(function(){
	restoreMpIfLowerThan(100, 500, 100);
	
	if(!autoHeal || character.rip || is_moving(character)) return;

	// Look for someone to heal
	const availableHealTargets = healTargets.filter(target => get_entity(target));
	
	if(availableHealTargets.length > 0) {
		// Heal based on distance
		availableHealTargets.sort((A, B) => getDistance(A) - getDistance(B));
		setState(`${availableHealTargets[0]}`);
	
	}
},1000/4); // Loops every 1/4 seconds.
