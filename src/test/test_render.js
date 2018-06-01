import test from 'ava';
import Player from '../app/objects/actors/player';
import Enemy from '../app/objects/actors/enemy';
import {ARMOR_ICON, ENEMY_ICON, PLAYER_ICON, SPACE, WALL} from "../app/const";
import Render from '../app/game/render'
import Armor from '../app/objects/artifacts/armor'
import Map from '../app/map/map'


test('test render actors', t => {
    let r = new Render();
    r.setDisplay([[{content: SPACE}, {content: SPACE}], [{content: SPACE}, {content: SPACE}]]);
    let player = new Player(0, 0, 3, PLAYER_ICON);
    let enemy = new Enemy(1, 0, 1, ENEMY_ICON);
    let actors = [player, enemy];
    r.draw_objects(actors, []);
    let display = r.getDisplay();

    t.is(display[0][0].content, player.hp);
    t.is(display[1][0].content, SPACE);
    t.is(display[0][1].content, ENEMY_ICON);
    t.is(display[1][1].content, SPACE);
});


test('test render artifacts', t => {
    let r = new Render();
    r.setDisplay([[{content: SPACE}, {content: SPACE}], [{content: SPACE}, {content: SPACE}]]);
    let armor = new Armor(1, 0, ARMOR_ICON);
    let artifacts = [armor];
    r.draw_objects([], artifacts);
    let display = r.getDisplay();

    t.is(display[0][0].content, SPACE);
    t.is(display[1][0].content, SPACE);
    t.is(display[0][1].content, ARMOR_ICON);
    t.is(display[1][1].content, SPACE);
});

