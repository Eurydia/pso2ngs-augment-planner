import { Augment, createMultipleAugments, EFFECTS as eff } from "./_base";

const GROUP = "SOUL";

export let soul: Array<Array<Augment>> = [];

soul.push(
    createMultipleAugments(
        3,
        "alts soul",
        {
            [eff.HP]: [5, 10, 15],
            [eff.DMG_RESIST]: [1.01, 1.02, 1.025],
        },
        [5, 7, 9],
        GROUP,
    ),
);
soul.push(
    createMultipleAugments(
        3,
        "dolz soul",
        {
            [eff.PP]: [5, 5, 5],
            [eff.FLOOR_POTENCY]: [1.01, 1.02, 1.025],
        },
        [5, 6, 7],
        GROUP,
    ),
);

const FORM_AUG = [
    { name: "forms", eff: eff.MEL_POTENCY },
    { name: "forms machini", eff: eff.RNG_POTENCY },
    { name: "forms sand", eff: eff.TEC_POTENCY },
];
FORM_AUG.forEach((aug) => {
    soul.push(
        createMultipleAugments(
            3,
            `${aug.name} soul`,
            {
                [aug.eff]: [1.02, 1.02, 1.02],
                [eff.DMG_RESIST]: [1, 1.02, 1.025],
            },
            [6, 8, 9],
            GROUP,
        ),
    );
});

const BOSS_SOUL_TIER_ONE = [
    { name: "daityl", eff: eff.MEL_POTENCY },
    { name: "pettas", eff: eff.RNG_POTENCY },
    { name: "nex", eff: eff.TEC_POTENCY },
];

BOSS_SOUL_TIER_ONE.forEach((aug) => {
    soul.push(
        createMultipleAugments(
            3,
            `${aug.name} soul`,
            {
                [eff.PP]: [5, 5, 5],
                [aug.eff]: [1.01, 1.02, 1.025],
            },
            [7, 8, 10],
            GROUP,
        ),
    );
});

const BOSS_SOUL_TIER_TWO = [
    { name: "dust", eff: eff.MEL_POTENCY },
    { name: "ragras", eff: eff.RNG_POTENCY },
    { name: "renus", eff: eff.TEC_POTENCY },
];

BOSS_SOUL_TIER_TWO.forEach((aug) => {
    soul.push(
        createMultipleAugments(
            3,
            `${aug.name} soul`,
            {
                [eff.HP]: [15, 15, 15],
                [aug.eff]: [1.01, 1.02, 1.025],
            },
            [7, 8, 10],
            GROUP,
        ),
    );
});

soul.push(
    createMultipleAugments(
        3,
        "eradi soul",
        {
            [eff.HP]: [10, 10, 10],
            [eff.PP]: [4, 4, 4],
            [eff.MEL_POTENCY]: [1.0125, 1.0175, 1.0225],
            [eff.RNG_POTENCY]: [1.0125, 1.0175, 1.0225],
            [eff.TEC_POTENCY]: [1.0125, 1.0175, 1.0225],
        },
        [0, 0, 0],
        GROUP,
    ),
);
