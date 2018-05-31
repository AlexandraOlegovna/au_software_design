import Artifact from "../../objects/artifacts/armor";
import Actor from "../../objects/actors/actor";
import {DIR_COORD, VIEW_RANGE} from '../../const';


export default class Actions {

    /**
     * совершил ли actor действие по направлению dir
     * @param self
     * @param actor
     * @param dir
     * @return {boolean} false - действия не было, true - действие свершилось
     */
    static move_to(self, actor, dir) {

        let position = {x: actor.x + dir.x, y: actor.y + dir.y};

        // стена или выход за границы поля
        if (!self.map.can_move(position))
            return false;

        // объект, находящийся на желаемой позиции
        let object = self.objects_map[[position.y, position.x]];

        // это другой персонаж -> ударить
        if (object instanceof Actor)
            return this._hit(self, object, position, actor);

        // это артефакт -> взять артефакт
        if (object instanceof Artifact)
            return this._get_artifact(self, object, position, actor);

        // это пустая клетка -> сделать шаг
        if (object == null)
            return this._make_step(self, actor, position, dir);
    }


    /**
     * использовать артефакт
     * возвращает false (использование артефакта не является действием)
     * @param self
     * @param ind
     * @return {boolean}
     */
    static use_artifact(self, ind) {
        // активация/дезакцивация артефакта
        let res = self.player.switch_artifact(ind);

        // если удалось активировать/дезактивировать артефакт
        if (res !== undefined)
            if (res)
                console.log("Player apply artifact " + ind.toString());
            else
                console.log("Player unapply artifact " + ind.toString());

        return false;
    }


    /**
     * действие противников
     * @param self
     * @param actor
     */
    static enemy_step(self, actor) {

        /**
         * случайное число от 0 до max
         * @param max
         * @return {number}
         */
        function randomInt(max) {
            return Math.floor(Math.random() * max);
        }

        // разница координат между противником и основным героем
        let dx = self.player.x - actor.x;
        let dy = self.player.y - actor.y;

        let dirs = Object.values(DIR_COORD);

        // если основной герой находится вне поля зрения противника,
        // противник ходит случайным образом
        if (Math.abs(dx) + Math.abs(dy) > VIEW_RANGE) {
            while (!this.move_to(self, actor, dirs[randomInt(dirs.length)])) {}
            return;
        }

        // двигаемся по направлению к игроку
        if (Math.abs(dx) > Math.abs(dy)) {
            if (dx < 0) {
                this.move_to(self, actor, DIR_COORD.left);
            } else {
                this.move_to(self, actor, DIR_COORD.right);
            }
        } else {
            if (dy < 0) {
                this.move_to(self, actor, DIR_COORD.up);
            } else {
                this.move_to(self, actor, DIR_COORD.down);
            }
        }
    }

    /**
     * actor ударяет enemy на координатах position
     * @param self
     * @param enemy
     * @param position
     * @param actor
     * @return {boolean}
     * @private
     */
    static _hit(self, enemy, position, actor) {
        enemy.hp--;

        // удаляем персонажа из списка и карты, если он умер
        if (enemy.hp === 0) {
            delete self.objects_map[[position.y, position.x]];
            self.actors.splice(self.actors.indexOf(enemy), 1);
        }
        console.log(`Actor(${actor.x}, ${actor.y}, ${actor.icon}) hit actor(${enemy.x}, ${enemy.y}, ${enemy.icon})`);
        return true;
    }

    /**
     * actor поднимает artifact на координатах position
     * @param self
     * @param artifact
     * @param position
     * @param actor
     * @return {boolean}
     * @private
     */
    static _get_artifact(self, artifact, position, actor) {
        // если персонаж не основной игрок, то он не может поднять артефакт
        if (actor !== self.player)
            return false;

        // добавляем артефакт в инвентарь
        self.player.add_artifact(artifact);

        // удаляем артефакт с карты
        delete self.objects_map[[position.y, position.x]];

        // удаляем артефакт из списка существующих(ненайденных) артефактов
        self.artifacts.splice(self.artifacts.indexOf(artifact), 1);

        console.log(`Actor(${actor.x}, ${actor.y}, ${actor.icon}) get artifact(${artifact.x}, ${artifact.y})`);
        return true;
    }


    /**
     * actor делает шаг на координату position по направлению dir
     * @param self
     * @param actor
     * @param position
     * @param dir
     * @return {boolean}
     * @private
     */
    static _make_step(self, actor, position, dir) {
        let old_x = actor.x;
        let old_y = actor.y;

        // удаляем персонажа с карты
        delete self.objects_map[[actor.y, actor.x]];

        actor.x = position.x;
        actor.y = position.y;

        // добавляем персонажа на карту
        self.objects_map[[actor.y, actor.x]] = actor;

        console.log(`Actor(${old_x}, ${old_y}, ${actor.icon}) go to ${dir.dir}`);
        return true;
    }
}