import {
    Augment,
    createMultipleAugments,
    EFFECTS as eff,
} from "./_base";

const GROUP = "DREAD";

export let dread: Array<Array<Augment>> = [];

dread.push(
    createMultipleAugments(
        "dread keeper",
        3,
        [
            { effect: eff.HP, amount: [10, 15, 30] },
            { effect: eff.PP, amount: [3, 4, 7] },
            {
                effect: eff.FLOOR_POTENCY,
                amount: [1.01, 1.015, 1.02],
            },
            { effect: eff.DMG_RESIST, amount: [1.01, 1.015, 1.02] },
        ],
        [7, 7.5, 10],
        GROUP,
    ),
);
