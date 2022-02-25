import Augment, { AugmentGroup } from "./_base";
import { createMultipleAugments } from "./_util";
import { DOUBLE_OFF_EFF } from "../_effect";

const GROUP = "DUALBLE";

let augments: Augment[] = [];

const NAME = ["melra", "meltech", "ratech"];
NAME.forEach((name, index) => {
    createMultipleAugments(
        `${name} dualble`,
        3,
        [
            ...DOUBLE_OFF_EFF[index].map((effect) => {
                return {
                    effect,
                    amount: [1.0075, 1.0125, 1.0175],
                };
            }),
        ],
        [4, 5, 6],
        GROUP,
    ).forEach((aug) => {
        augments.push(aug);
    });
});

const DUALBLE: AugmentGroup = {
    name: GROUP,
    augments,
};

export default DUALBLE;
