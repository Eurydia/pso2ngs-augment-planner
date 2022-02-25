import Augment, { AugmentGroup } from "./_base";
import { TRIPLE_OFF_EFF } from "../_effect";

const GROUP = "ELEMENTAL";

let augments: Array<Augment> = [];

["fire", "ice", "lightning", "wind"].forEach((elements) => {
    augments.push({
        name: `${elements} exploit`,
        level: 1,
        effects: [
            ...TRIPLE_OFF_EFF.map((effect) => {
                return {
                    effect,
                    amount: 1.025,
                };
            }),
        ],
        battlepower: 6,
        group: GROUP,
    });
});

const ELEMENTAL: AugmentGroup = {
    name: GROUP,
    augments,
};

export default ELEMENTAL;
