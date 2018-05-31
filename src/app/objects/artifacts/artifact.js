import GameObject from '../game_object';

export default class Armor extends GameObject{

    constructor(x, y, icon) {
        super(x, y, icon);
    }

    apply(player) {
        player.setHp(Infinity);
    }

    unapply(player) {
        player.setHp(3);
    }
}