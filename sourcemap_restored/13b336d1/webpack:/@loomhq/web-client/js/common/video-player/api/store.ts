import { Player } from './player';

const players = new Map<string, Player>();
const listeners: Record<string, any> = {};

export function setPlayer(id: string, videoElement: HTMLVideoElement): void {
  const player = new Player(videoElement);

  players.set(id, player);

  if (listeners[id]) {
    listeners[id].forEach((fn: (player: Player) => void) => fn(player));
    delete listeners[id];
  }
}

export function getPlayer(id: string): Player | null | undefined {
  if (players.has(id)) {
    return players.get(id);
  }

  return null;
}

export function removePlayer(id: string): boolean | null {
  if (players.has(id)) {
    players.get(id)?.destroyListeners();

    return players.delete(id);
  }

  return null;
}

export function skipPrePlay(id: string): void {
  const player = getPlayer(id);

  if (!player) {
    return;
  }

  player.firstFrame();
}

export function subscribeToPlayer(
  id: string,
  fn: (player: Player) => void
): void {
  const player = getPlayer(id);

  if (player) {
    fn(player);

    return;
  }

  if (!listeners[id]) {
    listeners[id] = [];
  }

  listeners[id].push(fn);
}
