import { EFFECTS as eff, Augment } from "./_base";

const GROUP = "ADDI";

export let addi: Array<Array<Augment>> = [];

let _addi: Array<Augment> = [];

const primary = [
    { name: "mel", effect: eff.MEL_POTENCY, amount: 1.025 },
    { name: "ra", effect: eff.RNG_POTENCY, amount: 1.025 },
    { name: "tech", effect: eff.TEC_POTENCY, amount: 1.025 },
];

const prefix = [
    { name: "sta", effect: eff.HP, amount: 20 },
    { name: "spi", effect: eff.PP, amount: 6 },
    { name: "deft", effect: eff.FLOOR_POTENCY, amount: 1.025 },
    { name: "gua", effect: eff.DMG_RESIST, amount: 1.025 },
];

primary.forEach((pri) => {
    prefix.forEach((pre) => {
        _addi.push(
            new Augment(
                `addi ${pre.name}${pri.name}`,
                0,
                {
                    [pre.effect]: pre.amount,
                    [pri.effect]: pri.amount,
                },
                10,
                GROUP,
            ),
        );
    });
});

primary.forEach((aug) => {
    _addi.push(
        new Augment(
            `addi staspi${aug.name}`,
            0,
            {
                [eff.HP]: 10,
                [eff.PP]: 3,
                [aug.effect]: aug.amount,
            },
            10,
            GROUP,
        ),
    );
});

primary.forEach((aug) => {
    _addi.push(
        new Augment(
            `addi ward${aug.name}`,
            0,
            {
                [aug.effect]: aug.amount,
                [eff.BURN_RESIST]: 1.2,
                [eff.FREEZE_RESIST]: 1.2,
                [eff.SHOCK_RESIST]: 1.2,
                [eff.BLIND_RESIST]: 1.2,
                [eff.PANIC_RESIST]: 1.2,
                [eff.POISON_RESIST]: 1.2,
                [eff.PANIC_RESIST]: 1.2,
            },
            10,
            GROUP,
        ),
    );
});

addi.push(_addi);
