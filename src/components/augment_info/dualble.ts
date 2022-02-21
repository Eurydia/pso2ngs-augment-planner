import {
    Augment,
    createMultipleAugments,
    EFFECTS as eff,
} from "./_base";

const GROUP = "DUALBLE";

export let dualble: Array<Array<Augment>> = [];

const POT_LEVEL = [1.0075, 1.0125, 1.0175];
const BP = [4, 5, 6];

dualble.push(
    createMultipleAugments(
        "melra dualble",
        3,
        {
            [eff.MEL_POTENCY]: POT_LEVEL,
            [eff.RNG_POTENCY]: POT_LEVEL,
        },
        BP,
        GROUP,
    ),
);

dualble.push(
    createMultipleAugments(
        3,
        "meltech dualble",
        {
            [eff.MEL_POTENCY]: POT_LEVEL,
            [eff.TEC_POTENCY]: POT_LEVEL,
        },
        BP,
        GROUP,
    ),
);
dualble.push(
    createMultipleAugments(
        3,
        "ratech dualble",
        {
            [eff.RNG_POTENCY]: POT_LEVEL,
            [eff.TEC_POTENCY]: POT_LEVEL,
        },
        BP,
        GROUP,
    ),
);
