import Augment, { AugmentGroup } from "./_base";
import { createMultipleAugments } from "./_util";
import { EFFECTS as eff, SINGLE_OFF_EFF } from "../_effect";

const GROUP = "GIGAS";

let augments: Augment[] = [];

["might", "precision", "technique"].forEach((name, index) => {
    createMultipleAugments(
        `gigas ${name}`,
        3,
        [
            { effect: eff.HP, amount: [5, 10, 15] },
            ...SINGLE_OFF_EFF[index].map((effect) => {
                return { effect, amount: [1.015, 1.02, 1.025] };
            }),
        ],
        [6, 8, 10],
        GROUP,
    ).forEach((aug) => {
        augments.push(aug);
    });
});

const GIGAS: AugmentGroup = {
    name: GROUP,
    augments,
};

export default GIGAS;
