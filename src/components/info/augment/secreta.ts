import Augment, { AugmentGroup } from "./_base";
import { createMultipleAugments } from "./_util";
import { EFFECTS as eff, TRIPLE_OFF_EFF } from "../_effect";

const GROUP = "SECREATA";

let augments: Augment[] = [];

createMultipleAugments(
    "alts secreta",
    3,
    [
        { effect: eff.HP, amount: [-10, -10, -10] },
        ...TRIPLE_OFF_EFF.map((effect) => {
            return {
                effect,
                amount: [1.01, 1.015, 1.02],
            };
        }),
        { effect: eff.FLOOR_POTENCY, amount: [1.01, 1.015, 1.02] },
        { effect: eff.DMG_RESIST, amount: [0.985, 0.985, 0.985] },
    ],
    [3, 4, 5],
    GROUP,
).forEach((aug) => {
    augments.push(aug);
});

const SECRETA: AugmentGroup = {
    name: GROUP,
    augments,
};

export default SECRETA;
