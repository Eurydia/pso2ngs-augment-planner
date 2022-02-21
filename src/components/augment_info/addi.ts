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

primary.forEach((primary) => {
    prefix.forEach((prefix) => {
        _addi.push({
            name: `addi ${prefix.name}${primary.name}`,
            level: 0,
            effects: [
                { effect: prefix.effect, amount: prefix.amount },
                { effect: primary.effect, amount: primary.amount },
            ],
            battlepower: 10,
            group: GROUP,
        });
    });
});

primary.forEach((aug) => {
    _addi.push({
        name: `addi staspi${aug.name}`,
        level: 0,
        effects: [
            { effect: eff.HP, amount: 10 },
            { effect: eff.PP, amount: 3 },
            { effect: aug.effect, amount: aug.amount },
        ],
        battlepower: 10,
        group: GROUP,
    });
});

primary.forEach((aug) => {
    _addi.push({
        name: `addi ward${aug.name}`,
        level: 0,
        effects: [
            { effect: aug.effect, amount: aug.amount },
            { effect: eff.BURN_RESIST, amount: 1.2 },
            { effect: eff.FREEZE_RESIST, amount: 1.2 },
            { effect: eff.SHOCK_RESIST, amount: 1.2 },
            { effect: eff.BLIND_RESIST, amount: 1.2 },
            { effect: eff.PANIC_RESIST, amount: 1.2 },
            { effect: eff.POISON_RESIST, amount: 1.2 },
            { effect: eff.PANIC_RESIST, amount: 1.2 },
        ],
        battlepower: 10,
        group: GROUP,
    });
});
addi.push(_addi);
