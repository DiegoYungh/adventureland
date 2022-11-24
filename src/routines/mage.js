import {} from ''

const KEYPOINTS = {
  BEE: {x: 682, y: 795}
}

var attack_mode=true;
var auto_track=true;
var auto_loot=true;
var use_secondary_attack=false;

var secondary_skill = "burst";

/**
* Check if current MP is equal or lower than the argument
*  and apply a MP potion if necessary
*/
function restoreMpIfLowerThan (min) {
	if(character.mp <= min) {
		use_skill("use_mp");
	}
}

function restoreHpIfLowerThan (min) {
	if(character.hp <= min) {
		use_skill("use_hp");
	}
}

function doHpOrMpRegen () {
	const hpDiff = character.max_hp - character.hp;
	const mpDiff = character.max_mp - character.mp;
	
	if(hpDiff > mpDiff) {
		if(!is_on_cooldown("regen_hp") && character.hp < (character.max_hp - 50)) {
			use_skill("regen_hp");
		}
	} else {
		if(!is_on_cooldown("regen_mp") && character.mp < (character.max_mp - 100)) {
			use_skill("regen_mp");
		}
	}
}

setInterval(function(){

	// use_hp_or_mp();
	restoreMpIfLowerThan(50);
	restoreHpIfLowerThan(500);
	doHpOrMpRegen();
	auto_loot && loot();
	
	if(!attack_mode || character.rip || is_moving(character)) return;

	var target=get_targeted_monster();
	if(auto_track && !target)
	{
		
		target=get_nearest_monster({
			min_xp: 100,
			max_att: 30
		});
		
		if(target) change_target(target);
		else
		{
			set_message("No Monsters");
			return;
		}
	}
	
	if(target && !is_in_range(target))
	{
		move(
			character.x+(target.x-character.x)/2,
			character.y+(target.y-character.y)/2
			);
		// Walk half the distance
	}
	else if(can_attack(target))
	{
		set_message("Attacking");
		attack(target);
	}

},1000/4); // Loops every 1/4 seconds.

// Loop only for attack logic
setInterval(function(){
	var target=get_targeted_monster();
	
	if(target && can_attack(target))
	{
		if (use_secondary_attack && !is_on_cooldown(secondary_skill)) {
			use_skill(secondary_skill, target);
		}
	}
}, 300);

// Learn Javascript: https://www.codecademy.com/learn/introduction-to-javascript
// Write your own CODE: https://github.com/kaansoral/adventureland
