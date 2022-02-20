import { Augment, createMultipleAugments, EFFECTS as eff } from "./_base";

const GROUP = "WARD";

export let ward: Array<Array<Augment>> = [];

const WARD_AUG = [
    { name: "burn", eff: eff.BURN_RESIST },
    { name: "freeze", eff: eff.FREEZE_RESIST },
    { name: "shock", eff: eff.SHOCK_RESIST },
    { name: "blind", eff: eff.BLIND_RESIST },
    { name: "panic", eff: eff.PANIC_RESIST },
    { name: "poison", eff: eff.POISON_RESIST },
    { name: "pain", eff: eff.PHYSICAL_DOWN_RESIST },
];

WARD_AUG.forEach((w) => {
    ward.push(
        createMultipleAugments(
            3,
            `${w.name} ward`,
            {
                [w.eff]: [1.2, 1.25, 1.3],
            },
            [4, 5, 6],
            GROUP,
        ),
    );
});

ward.push(
    createMultipleAugments(
        3,
        "sovereign Ward",
        {
            [eff.BURN_RESIST]: [1.2, 1.25, 1.3],
            [eff.FREEZE_RESIST]: [1.2, 1.25, 1.3],
            [eff.SHOCK_RESIST]: [1.2, 1.25, 1.3],
            [eff.BLIND_RESIST]: [1.2, 1.25, 1.3],
            [eff.PANIC_RESIST]: [1.2, 1.25, 1.3],
            [eff.POISON_RESIST]: [1.2, 1.25, 1.3],
            [eff.PHYSICAL_DOWN_RESIST]: [1.2, 1.25, 1.3],
        },
        [6, 8, 10],
        GROUP,
    ),
);
