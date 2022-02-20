import { EFFECTS as eff, Augment, createMultipleAugments } from "./_base";

const GROUP = "BASIC";

export let basic: Array<Array<Augment>> = [];

basic.push(
    createMultipleAugments(
        3,
        "stamina",
        { [eff.HP]: [5, 10, 15] },
        [3, 4, 5],
        GROUP,
    ),
);

basic.push(
    createMultipleAugments(
        3,
        "spirit",
        { [eff.PP]: [3, 4, 5] },
        [2, 3, 4],
        GROUP,
    ),
);

basic.push(
    createMultipleAugments(
        3,
        "might",
        { [eff.MEL_POTENCY]: [1.01, 1.015, 1.02] },
        [4, 5, 6],
        GROUP,
    ),
);

basic.push(
    createMultipleAugments(
        3,
        "precision",
        { [eff.RNG_POTENCY]: [1.01, 1.015, 1.02] },
        [4, 5, 6],
        GROUP,
    ),
);

basic.push(
    createMultipleAugments(
        3,
        "technique",
        { [eff.TEC_POTENCY]: [1.01, 1.015, 1.02] },
        [4, 5, 6],
        GROUP,
    ),
);

basic.push(
    createMultipleAugments(
        3,
        "deftness",
        { [eff.FLOOR_POTENCY]: [1.01, 1.015, 1.02] },
        [3, 4, 5],
        GROUP,
    ),
);

basic.push(
    createMultipleAugments(
        3,
        "guard",
        { [eff.DMG_RESIST]: [1.01, 1.015, 1.02] },
        [2, 3, 4],
        GROUP,
    ),
);

basic.push(
    createMultipleAugments(
        3,
        "mastery",
        {
            [eff.MEL_POTENCY]: [1.005, 1.01, 1.05],
            [eff.RNG_POTENCY]: [1.005, 1.01, 1.05],
            [eff.TEC_POTENCY]: [1.005, 1.01, 1.05],
            [eff.FLOOR_POTENCY]: [1.005, 1.01, 1.05],
            [eff.DMG_RESIST]: [1.005, 1.01, 1.05],
        },
        [6, 8, 10],
        GROUP,
    ),
);
