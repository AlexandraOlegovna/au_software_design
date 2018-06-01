import test from 'ava';
import Actions from '../app/game/actions/actions';
import Player from '../app/objects/actors/player';
import Enemy from '../app/objects/actors/enemy';
import {DIR_COORD, SPACE} from "../app/const";
import GameEngine from '../app/game/game';
import Armor from '../app/objects/artifacts/armor'


test('move_to player hit enemy', t => {
    let g = new GameEngine();
    g.player = new Player(0, 0, 3, "");
    let enemy = new Enemy(1, 0, 1, "");
    g.actors.push(g.player, enemy);
    g.objects_map[[0, 0]] = g.player;
    g.objects_map[[0, 1]] = enemy;
    g.map.setMap([[SPACE, SPACE], [SPACE, SPACE]]);
    let result = Actions.move_to(g, g.player, DIR_COORD.right);

    t.is(result, true);
    t.is(enemy.hp, 0);
    t.is(g.player.hp, 3);
    t.is(g.player.x, 0);
    t.is(g.player.y, 0);
    t.is(g.actors.length, 1);
    t.is(g.objects_map[[0, 0]], g.player);
    t.is(g.objects_map[[0, 1]], undefined);
});


test('move_to enemy hit player', t => {
    let g = new GameEngine();
    g.player = new Player(0, 0, 3, "");
    let enemy = new Enemy(1, 0, 1, "");
    g.actors.push(g.player, enemy);
    g.objects_map[[0, 0]] = g.player;
    g.objects_map[[0, 1]] = enemy;
    g.map.setMap([[SPACE, SPACE], [SPACE, SPACE]]);
    let result = Actions.move_to(g, enemy, DIR_COORD.left);

    t.is(result, true);
    t.is(enemy.hp, 1);
    t.is(g.player.hp, 2);
    t.is(g.player.x, 0);
    t.is(g.player.y, 0);
    t.is(g.actors.length, 2);
    t.is(g.objects_map[[0, 0]], g.player);
    t.is(g.objects_map[[0, 1]], enemy);
});


test('move_to get_artifact player', t => {
    let g = new GameEngine();
    g.player = new Player(0, 0, 3, "");
    let armor = new Armor(0, 1);
    g.actors.push(g.player);
    g.artifacts.push(armor);
    g.objects_map[[0, 0]] = g.player;
    g.objects_map[[1, 0]] = armor;
    g.map.setMap([[SPACE, SPACE], [SPACE, SPACE]]);
    let result = Actions.move_to(g, g.player, DIR_COORD.down);

    t.is(result, true);
    t.is(g.player.hp, 3);
    t.is(g.player.x, 0);
    t.is(g.player.y, 0);
    t.is(g.actors.length, 1);
    t.is(g.artifacts.length,0);
    t.is(g.objects_map[[0, 0]], g.player);
    t.is(g.objects_map[[0, 1]], undefined);
});


test('move_to get_artifact enemy', t => {
    let g = new GameEngine();
    g.player = new Player(0, 0, 3, "");
    let enemy = new Enemy(1, 1, 1, "");
    let armor = new Armor(1, 0);
    g.actors.push(g.player, enemy);
    g.artifacts.push(armor);
    g.objects_map[[0, 0]] = g.player;
    g.objects_map[[1, 1]] = enemy;
    g.objects_map[[0, 1]] = armor;
    g.map.setMap([[SPACE, SPACE], [SPACE, SPACE]]);
    let result = Actions.move_to(g, enemy, DIR_COORD.up);

    t.is(result, false);
    t.is(g.player.hp, 3);
    t.is(g.player.x, 0);
    t.is(g.player.y, 0);
    t.is(g.actors.length, 2);
    t.is(g.artifacts.length, 1);
    t.is(g.objects_map[[0, 0]], g.player);
    t.is(g.objects_map[[1, 1]], enemy);
    t.is(g.objects_map[[0, 1]], armor);
});


test('move_to make_step enemy', t => {
    let g = new GameEngine();
    g.player = new Player(0, 0, 3, "");
    let enemy = new Enemy(1, 1, 1, "");
    g.actors.push(g.player, enemy);
    g.objects_map[[0, 0]] = g.player;
    g.objects_map[[1, 1]] = enemy;
    g.map.setMap([[SPACE, SPACE], [SPACE, SPACE]]);
    let result = Actions.move_to(g, enemy, DIR_COORD.up);

    t.is(result, true);
    t.is(g.player.hp, 3);
    t.is(g.player.x, 0);
    t.is(g.player.y, 0);
    t.is(enemy.hp, 1);
    t.is(enemy.x, 1);
    t.is(enemy.y, 0);
    t.is(g.actors.length, 2);
    t.is(g.objects_map[[0, 0]], g.player);
    t.is(g.objects_map[[0, 1]], enemy);
});


test('move_to make_step player', t => {
    let g = new GameEngine();
    g.player = new Player(0, 0, 3, "");
    let enemy = new Enemy(1, 1, 1, "");
    g.actors.push(g.player, enemy);
    g.objects_map[[0, 0]] = g.player;
    g.objects_map[[1, 1]] = enemy;
    g.map.setMap([[SPACE, SPACE], [SPACE, SPACE]]);
    let result = Actions.move_to(g, g.player, DIR_COORD.down);

    t.is(result, true);
    t.is(g.player.hp, 3);
    t.is(g.player.x, 0);
    t.is(g.player.y, 1);
    t.is(enemy.hp, 1);
    t.is(enemy.x, 1);
    t.is(enemy.y, 1);
    t.is(g.actors.length, 2);
    t.is(g.objects_map[[1, 0]], g.player);
    t.is(g.objects_map[[1, 1]], enemy);
});

