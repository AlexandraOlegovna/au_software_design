import Artifact from "../../objects/artifacts/artifact";
import Actor from "../../objects/actors/actor";
import {DIR_COORD, VIEW_RANGE} from '../../const';


export default class Actions {

    static move_to(self, actor, dir) {

        if (!self.map.can_go(actor, dir))
            return false;

        let position = [actor.y + dir.y, actor.x + dir.x];
        let object = self.objects_map[position];

        if (object instanceof Actor)
            return this._fight(self, object, position, actor);

        if (object instanceof Artifact)
            return this._get_artifact(self, object, position, actor);

        if (object == null)
            return this._make_step(self, actor, dir);
    }


    static use_artifact(self, ind) {
        let res = self.player.use_artifact(ind);
        if (res !== undefined)
            if (res)
                console.log("Player apply artifact " + ind.toString());
            else
                console.log("Player unapply artifact " + ind.toString());

        return false;
    }


    static enemy_step(self, actor) {
        function randomInt(max) {
            return Math.floor(Math.random() * max);
        }

        let dx = self.player.x - actor.x;
        let dy = self.player.y - actor.y;

        let dirs = Object.values(DIR_COORD);
        if (Math.abs(dx) + Math.abs(dy) > VIEW_RANGE) {
            while (!this.move_to(self, actor, dirs[randomInt(dirs.length)])) {}
            return;
        }


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


    static _fight(self, enemy, position, actor) {
        enemy.hp--;
        if (enemy.hp === 0) {
            delete self.objects_map[position];
            self.actors.splice(self.actors.indexOf(enemy), 1);
        }
        console.log(`Actor(${actor.x}, ${actor.y}, ${actor.icon}) hit actor(${enemy.x}, ${enemy.y}, ${enemy.icon})`);
        return true;
    }


    static _get_artifact(self, artifact, position, actor) {
        if (actor !== self.player)
            return false;
        self.player.add_artifact(artifact);
        delete self.objects_map[position];
        self.artifacts.splice(self.artifacts.indexOf(artifact), 1);
        console.log(`Actor(${actor.x}, ${actor.y}, ${actor.icon}) get artifact(${artifact.x}, ${artifact.y})`);
        return true;
    }


    static _make_step(self, actor, dir) {
        let old_x = actor.x;
        let old_y = actor.y;

        delete self.objects_map[[actor.y, actor.x]];
        actor.y += dir.y;
        actor.x += dir.x;
        self.objects_map[[actor.y, actor.x]] = actor;
        console.log(`Actor(${old_x}, ${old_y}, ${actor.icon}) go to ${dir.dir}`);
        return true;
    }
}