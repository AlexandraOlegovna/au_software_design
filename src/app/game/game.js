import Map from '../map/map';
import Render from './render';
import GameInitializer from './initializer';
import Actions from './actions/actions';

import { FONT, COLS, ROWS, DIR_COORD, WIN, LOSS } from '../const';

/**
 * Основной движок игры
 * @class
 */
export default class GameEngine {

    constructor() {
        // карта
        this.map = new Map();

        // дисплей игры (то, что нарисовано у пользователя)
        this.display = new Render();

        // основной игрок
        this.player = null;

        // персонажи (основной игрок и враги)
        this.actors = [];

        // артефакты
        this.artifacts = [];

        // позиции всех существующих объектов на карте
        this.objects_map = {};

        // объект для Phaser
        this.game = null
    }


    /**
     * инициализация игры и старт
     * @return {Phaser.Game}
     */
    start() {
        let self = this;
        this.game = new Phaser.Game(COLS * FONT, ROWS * FONT, Phaser.AUTO, null, {
            create: this._create.bind(self)
        });

        return this.game
    }

    /**
     * создание объекта для Phaser
     * @private
     */
    _create() {
        let self = this;
        this.game.input.keyboard.addCallbacks(null, null, this._on_key_press.bind(self));

        // инициализация и отрисовка всех объектов
        GameInitializer.init_game(this);
    }


    /**
     * действие при нажатии на клавишу
     * @param event
     * @private
     */
    _on_key_press(event) {

        // отрисовка карты
        this.display.draw_map(this.map);

        // было ли совершено событие в игре
        let is_acted = false;

        // ход игрока
        switch (event.keyCode) {
            case Phaser.Keyboard.LEFT:
                is_acted = Actions.move_to(this, this.player, DIR_COORD.left);
                break;

            case Phaser.Keyboard.RIGHT:
                is_acted = Actions.move_to(this, this.player, DIR_COORD.right);
                break;

            case Phaser.Keyboard.UP:
                is_acted = Actions.move_to(this, this.player, DIR_COORD.up);
                break;

            case Phaser.Keyboard.DOWN:
                is_acted = Actions.move_to(this, this.player, DIR_COORD.down);
                break;

            case Phaser.Keyboard.ONE:
                is_acted = Actions.use_artifact(this, 0);
                break;
        }

        // ход противников, если игрок совершил действие
        if (is_acted)
            for (let e = 1; e < this.actors.length; e++) {
                Actions.enemy_step(this, this.actors[e]);
            }

        // отрисовка объектов
        this.display.draw_objects(this.actors, this.artifacts);

        // отрисовка конца игры
        this._is_game_end();
    }


    /**
     * отрисовка конца игры
     * @private
     */
    _is_game_end() {
        if (this.actors.length === 1) {
            let victory = this.game.add.text(this.game.world.centerX, this.game.world.centerY, WIN.text, WIN.style);
            victory.anchor.setTo(0.5, 0.5);
            this.game.input.keyboard.disabled = true;
        }

        else if (this.player.hp < 1) {
            let gameOver = this.game.add.text(this.game.world.centerX, this.game.world.centerY, LOSS.text, LOSS.style);
            gameOver.anchor.setTo(0.5, 0.5);
            this.game.input.keyboard.disabled = true;
        }
    }
}