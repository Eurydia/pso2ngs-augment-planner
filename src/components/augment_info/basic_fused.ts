import { EFFECTS as eff, Augment } from "./_base";

export const GROUP = "BASIC_FUSED";

export let basic_fused: Array<Array<Augment>> = [];

const primary = [
    { name: "might", effect: eff.MEL_POTENCY, amount: 1.02 },
    { name: "precision", effect: eff.RNG_POTENCY, amount: 1.02 },
    { name: "technique", effect: eff.TEC_POTENCY, amount: 1.02 },
];

const prefix = [
    { name: "sta", effect: eff.HP, amount: 15 },
    { name: "spi", effect: eff.PP, amount: 5 },
    { name: "deft", effect: eff.FLOOR_POTENCY, amount: 1.02 },
    { name: "gua", effect: eff.DMG_RESIST, amount: 1.02 },
];

let fused_augments: Array<Augment> = [];

primary.forEach((primary) => {
    prefix.forEach((prefix) => {
        fused_augments.push({
            name: `${prefix.name} ${primary.name}`,
            level: 0,
            effects: [
                { effect: prefix.effect, amount: prefix.amount },
                { effect: primary.effect, amount: primary.amount },
            ],
            battlepower: 8,
            group: GROUP,
        });
    });
});

basic_fused.push(fused_augments);
