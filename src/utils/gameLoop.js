export const gameLoop = (action, interval = 250) => {
  return setInterval(() => {
    if(character.rip || is_moving(character)) return;

    action && action();
  }, interval);
}