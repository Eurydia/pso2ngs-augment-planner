import { Augment, createMultipleAugments, EFFECTS as eff } from "./_base";

const GROUP = "DREAD";

export let dread: Array<Array<Augment>> = [];

dread.push(
    createMultipleAugments(
        3,
        "dread keeper",
        {
            [eff.HP]: [10, 15, 30],
            [eff.PP]: [3, 4, 7],
            [eff.FLOOR_POTENCY]: [1.01, 1.015, 1.02],
            [eff.DMG_RESIST]: [1.01, 1.015, 1.02],
        },
        [7, 7.5, 10],
        GROUP,
    ),
);
