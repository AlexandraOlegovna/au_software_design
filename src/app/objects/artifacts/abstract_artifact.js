import GameObject from '../game_object';

/**
 * абстрактный артефакт
 * @class
 */
export default class AbstractArtifact extends GameObject{

    /**
     * применить артефакт
     * @param player
     */
    apply(player) {
        throw new TypeError("Must override method");
    }

    /**
     * снять артефакт
     * @param player
     */
    unapply(player) {
        throw new TypeError("Must override method");
    }
}