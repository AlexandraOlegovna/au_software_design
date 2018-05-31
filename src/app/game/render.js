import { FONT, COLS, ROWS, STYLE} from '../const';

/**
 * прорисовка игры
 * @class
 */
export default class Render {

    constructor(){
        this._display = [];
        this.setDisplay = function(display) { this._display = display; };
        this.getDisplay = function() { return this._display; };
    }

    /**
     * создание поля для игры
     * @param game
     */
    init(game) {

        function initCell(x, y) {
            return game.add.text(FONT * x, FONT * y, '', STYLE);
        }

        for (let y = 0; y < ROWS; y++) {
            const row = [];
            this._display.push(row);
            for (let x = 0; x < COLS; x++)
                row.push(initCell(x, y));
        }
    }

    /**
     * прорисовка карты
     * @param map
     */
    draw_map(map) {
        for (let y = 0; y < ROWS; y++)
            for (let x = 0; x < COLS; x++)
                this._display[y][x].content = map.get_symbol(y, x);
    }

    /**
     * отрисовка объектов на карте
     * @param actors
     * @param artifacts
     */
    draw_objects(actors, artifacts) {
        this._draw_actors(actors);
        this._draw_artifacts(artifacts);
    }

    /**
     * отрисовка персонажей
     * @param actors
     * @private
     */
    _draw_actors(actors) {
        for (let a = 0; a < actors.length; a++) {
            let actor = actors[a];
            // отрисовка основного игорока
            if (a === 0) {
                let hp = actor.getHp();
                // игрок отображется в виде его hp,
                // если hp не помещается в один символ, то отображается основная иконка игрока
                this._display[actor.y][actor.x].content = (hp > 10) ? actor.icon : hp;
            }
            // отрисовка противников
            else
                this._display[actor.y][actor.x].content = actor.icon;
        }
    }


    /**
     * отрисовка артефактов
     * @param artifacts
     * @private
     */
    _draw_artifacts(artifacts) {
        for (let a = 0; a < artifacts.length; a++) {
            let artifact = artifacts[a];
            this._display[artifact.y][artifact.x].content = artifact.icon;
        }
    }
}