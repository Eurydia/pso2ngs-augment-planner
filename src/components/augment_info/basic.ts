import {
    EFFECTS as eff,
    Augment,
    createMultipleAugments,
} from "./_base";

export const GROUP = "BASIC";

export let basic: Array<Array<Augment>> = [];

basic.push(
    createMultipleAugments(
        "stamina",
        3,
        [{ effect: eff.HP, amount: [5, 10, 15] }],
        [3, 4, 5],
        GROUP,
    ),
);

basic.push(
    createMultipleAugments(
        "spirit",
        3,
        [{ effect: eff.PP, amount: [3, 4, 5] }],
        [2, 3, 4],
        GROUP,
    ),
);

const NON_MASTERY_AMOUNT = [1.01, 1.015, 1.02];

basic.push(
    createMultipleAugments(
        "might",
        3,
        [{ effect: eff.MEL_POTENCY, amount: NON_MASTERY_AMOUNT }],
        [4, 5, 6],
        GROUP,
    ),
);

basic.push(
    createMultipleAugments(
        "precision",
        3,
        [{ effect: eff.RNG_POTENCY, amount: NON_MASTERY_AMOUNT }],
        [4, 5, 6],
        GROUP,
    ),
);

basic.push(
    createMultipleAugments(
        "technique",
        3,
        [{ effect: eff.TEC_POTENCY, amount: NON_MASTERY_AMOUNT }],
        [4, 5, 6],
        GROUP,
    ),
);

basic.push(
    createMultipleAugments(
        "deftness",
        3,
        [
            {
                effect: eff.FLOOR_POTENCY,
                amount: NON_MASTERY_AMOUNT,
            },
        ],
        [3, 4, 5],
        GROUP,
    ),
);

basic.push(
    createMultipleAugments(
        "guard",
        3,
        [{ effect: eff.DMG_RESIST, amount: NON_MASTERY_AMOUNT }],
        [2, 3, 4],
        GROUP,
    ),
);

const MASTERY_AMOUNT = [1.005, 1.01, 1.05];

basic.push(
    createMultipleAugments(
        "mastery",
        3,
        [
            { effect: eff.MEL_POTENCY, amount: MASTERY_AMOUNT },
            { effect: eff.RNG_POTENCY, amount: MASTERY_AMOUNT },
            { effect: eff.TEC_POTENCY, amount: MASTERY_AMOUNT },
            { effect: eff.FLOOR_POTENCY, amount: MASTERY_AMOUNT },
            { effect: eff.DMG_RESIST, amount: MASTERY_AMOUNT },
        ],
        [6, 8, 10],
        GROUP,
    ),
);
