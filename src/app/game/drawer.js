import { FONT, COLS, ROWS, STYLE} from '../const';


export default class Drawer {

    constructor(){
        this._display = []
    }

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

    draw_map(map) {
        for (let y = 0; y < ROWS; y++)
            for (let x = 0; x < COLS; x++)
                this._display[y][x].content = map.get_symbol(y, x);
    }

    draw_objects(actors, artifacts) {
        this._draw_actors(actors);
        this._draw_artifacts(artifacts);
    }

    _draw_actors(actors) {
        for (let a = 0; a < actors.length; a++) {
            let actor = actors[a];
            if (a === 0) {
                let hp = actor.getHp();
                this._display[actor.y][actor.x].content = (hp > 10) ? "i" : hp;
            }
            else
                this._display[actor.y][actor.x].content = actor.icon;
        }
    }

    _draw_artifacts(artifacts) {
        for (let a = 0; a < artifacts.length; a++) {
            let artifact = artifacts[a];
            this._display[artifact.y][artifact.x].content = artifact.icon;
        }
    }

}