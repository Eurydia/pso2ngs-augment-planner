import Augment, { AugmentGroup } from "./_base";
import { TRIPLE_OFF_EFF } from "../_effect";

const GROUP = "FUSIA";

let augments: Array<Augment> = [];

augments.push({
    name: "megas fusia",
    level: 0,
    effects: [
        ...TRIPLE_OFF_EFF.map((effect) => {
            return {
                effect,
                amount: 1.01,
            };
        }),
    ],
    battlepower: 4,
    group: GROUP,
});

const FUSIA: AugmentGroup = {
    name: GROUP,
    augments,
};

export default FUSIA;
