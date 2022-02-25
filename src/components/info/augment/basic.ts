import Augment, { AugmentGroup } from "./_base";
import { createMultipleAugments } from "./_util";
import {
    EFFECTS as eff,
    SINGLE_OFF_EFF,
    TRIPLE_OFF_EFF,
} from "../_effect";

export const GROUP = "BASIC";

let augments: Augment[] = [];

createMultipleAugments(
    "stamina",
    3,
    [{ effect: eff.HP, amount: [5, 10, 15] }],
    [3, 4, 5],
    GROUP,
).forEach((aug) => {
    augments.push(aug);
});

createMultipleAugments(
    "spirit",
    3,
    [{ effect: eff.PP, amount: [3, 4, 5] }],
    [2, 3, 4],
    GROUP,
).forEach((aug) => {
    augments.push(aug);
});

["might", "precision", "technique"].forEach((name, index) => {
    createMultipleAugments(
        name,
        3,
        SINGLE_OFF_EFF[index].map((effect) => {
            return {
                effect,
                amount: [1.01, 1.015, 1.02],
            };
        }),
        [4, 5, 6],
        GROUP,
    ).forEach((aug) => {
        augments.push(aug);
    });
});

createMultipleAugments(
    "deftness",
    3,
    [
        {
            effect: eff.FLOOR_POTENCY,
            amount: [1.01, 1.015, 1.02],
        },
    ],
    [3, 4, 5],
    GROUP,
).forEach((aug) => {
    augments.push(aug);
});

createMultipleAugments(
    "guard",
    3,
    [{ effect: eff.DMG_RESIST, amount: [1.01, 1.015, 1.02] }],
    [2, 3, 4],
    GROUP,
).forEach((aug) => {
    augments.push(aug);
});

const MASTERY_AMOUNT = [1.005, 1.01, 1.05];
createMultipleAugments(
    "mastery",
    3,
    [
        ...TRIPLE_OFF_EFF.map((effect) => {
            return { effect, amount: MASTERY_AMOUNT };
        }),
        { effect: eff.FLOOR_POTENCY, amount: MASTERY_AMOUNT },
        { effect: eff.DMG_RESIST, amount: MASTERY_AMOUNT },
    ],
    [6, 8, 10],
    GROUP,
).forEach((aug) => {
    augments.push(aug);
});

const BASIC: AugmentGroup = {
    name: GROUP,
    augments,
};

export default BASIC;
