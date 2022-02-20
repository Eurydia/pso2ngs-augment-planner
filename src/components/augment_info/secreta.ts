import { Augment, createMultipleAugments, EFFECTS as eff } from "./_base";

const GROUP = "SECREATA";

export let secreata: Array<Array<Augment>> = [];

secreata.push(
    createMultipleAugments(
        3,
        "alts secreta",
        {
            [eff.HP]: [-10, -10, -10],
            [eff.MEL_POTENCY]: [1.01, 1.015, 1.02],
            [eff.RNG_POTENCY]: [1.01, 1.015, 1.02],
            [eff.TEC_POTENCY]: [1.01, 1.015, 1.02],
            [eff.FLOOR_POTENCY]: [1.01, 1.015, 1.02],
            [eff.DMG_RESIST]: [0.985, 0.985, 0.985],
        },
        [3, 4, 5],
        GROUP,
    ),
);
