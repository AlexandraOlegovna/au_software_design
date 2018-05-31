import Map from '../map/map';
import Drawer from './drawer';
import GameInitializer from './initializer';
import Actions from './actions/actions';

import { FONT, COLS, ROWS, DIR_COORD, WIN, LOSS } from '../const';


export default class GameEngine {

    constructor() {
        this.map = new Map();
        this.display = new Drawer();
        this.player = null;
        this.actors = [];
        this.artifacts = [];
        this.objects_map = {};

        let self = this;
        this.game = new Phaser.Game(COLS * FONT, ROWS * FONT, Phaser.AUTO, null, {
            create: this._create.bind(self)
        });
    }


    _create() {
        let self = this;
        this.game.input.keyboard.addCallbacks(null, null, this._on_key_press.bind(self));

        GameInitializer.init_game(this);
    }


    _on_key_press(event) {

        this.display.draw_map(this.map);


        let acted = false;
        switch (event.keyCode) {
            case Phaser.Keyboard.LEFT:
                acted = Actions.move_to(this, this.player, DIR_COORD.left);
                break;

            case Phaser.Keyboard.RIGHT:
                acted = Actions.move_to(this, this.player, DIR_COORD.right);
                break;

            case Phaser.Keyboard.UP:
                acted = Actions.move_to(this, this.player, DIR_COORD.up);
                break;

            case Phaser.Keyboard.DOWN:
                acted = Actions.move_to(this, this.player, DIR_COORD.down);
                break;

            case Phaser.Keyboard.ONE:
                acted = Actions.use_artifact(this, 0);
                break;
        }

        if (acted)
            for (let e = 1; e < this.actors.length; e++) {
                Actions.enemy_step(this, this.actors[e]);
            }

        this.display.draw_objects(this.actors, this.artifacts);
        this._is_game_end();
    }


    _is_game_end() {
        if (this.actors.length === 1) {
            let victory = this.game.add.text(this.game.world.centerX, this.game.world.centerY, WIN.text, WIN.style);
            victory.anchor.setTo(0.5, 0.5);
        }

        else if (this.player.hp < 1) {
            let gameOver = this.game.add.text(this.game.world.centerX, this.game.world.centerY, LOSS.text, LOSS.style);
            gameOver.anchor.setTo(0.5, 0.5);
        }
    }
}