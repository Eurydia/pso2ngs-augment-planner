import Augment, { AugmentGroup } from "./_base";
import { createMultipleAugments } from "./_util";
import {
    EFFECTS as eff,
    SINGLE_OFF_EFF,
    TRIPLE_OFF_EFF,
} from "../_effect";

const GROUP = "SOUL";

let augments: Augment[] = [];

createMultipleAugments(
    "alts soul",
    3,
    [
        { effect: eff.HP, amount: [5, 10, 15] },
        { effect: eff.DMG_RESIST, amount: [1.01, 1.02, 1.025] },
    ],
    [5, 7, 9],
    GROUP,
).forEach((aug) => {
    augments.push(aug);
});

createMultipleAugments(
    "dolz soul",
    3,
    [
        { effect: eff.PP, amount: [5, 5, 5] },
        { effect: eff.FLOOR_POTENCY, amount: [1.01, 1.02, 1.025] },
    ],
    [5, 6, 7],
    GROUP,
).forEach((aug) => {
    augments.push(aug);
});

["forms", "forms machini", "form sand"].forEach((name, index) => {
    createMultipleAugments(
        `${name} soul`,
        3,
        [
            ...SINGLE_OFF_EFF[index].map((effect) => {
                return {
                    effect,
                    amount: [1.02, 1.02, 1.02],
                };
            }),
            { effect: eff.DMG_RESIST, amount: [1, 1.02, 1.025] },
        ],
        [6, 8, 9],
        GROUP,
    ).forEach((aug) => {
        augments.push(aug);
    });
});

["daityl", "pettas", "nex"].forEach((name, index) => {
    createMultipleAugments(
        `${name} soul`,
        3,
        [
            { effect: eff.PP, amount: [5, 5, 5] },
            ...SINGLE_OFF_EFF[index].map((effect) => {
                return { effect, amount: [1.01, 1.02, 1.025] };
            }),
        ],
        [7, 8, 10],
        GROUP,
    ).forEach((aug) => {
        augments.push(aug);
    });
});

["dust", "ragras", "renus"].forEach((name, index) => {
    createMultipleAugments(
        `${name} soul`,
        3,
        [
            { effect: eff.HP, amount: [15, 15, 15] },
            ...SINGLE_OFF_EFF[index].map((effect) => {
                return { effect, amount: [1.01, 1.02, 1.025] };
            }),
        ],
        [7, 8, 10],
        GROUP,
    ).forEach((aug) => {
        augments.push(aug);
    });
});

createMultipleAugments(
    "eradi soul",
    3,
    [
        { effect: eff.HP, amount: [10, 10, 10] },
        { effect: eff.PP, amount: [4, 4, 4] },
        ...TRIPLE_OFF_EFF.map((effect) => {
            return {
                effect,
                amount: [1.0125, 1.0175, 1.0225],
            };
        }),
    ],
    [0, 0, 0],
    GROUP,
).forEach((aug) => {
    augments.push(aug);
});

const SOUL: AugmentGroup = {
    name: GROUP,
    augments,
};

export default SOUL;
