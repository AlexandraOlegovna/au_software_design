import GameObject from '../game_object';

export default class Actor extends GameObject{

    constructor(x, y, hp, icon) {
        super(x, y, icon);
        this.hp = hp;
        this.setHp = function(hp) { this.hp = hp; };
        this.getHp = function() { return this.hp; };
    }
}
