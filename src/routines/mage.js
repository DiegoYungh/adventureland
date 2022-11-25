import {gameLoop} from 'src/utils/gameLoop';
import {restoreHp, restoreMp} from 'src/utils/restore';
import {protect} from 'src/utils/protect';

gameLoop(() => {

	restoreMp({ value: "50%" });
	restoreHp({ value: "50%" });
	loot();

	protect("ShiroChi");
});