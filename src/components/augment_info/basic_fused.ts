import { EFFECTS as eff, Augment } from "./_base";

const GROUP = "BASIC_FUSED";

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

primary.forEach((pri) => {
    prefix.forEach((pre) => {
        fused_augments.push(
            new Augment(
                `${pre.name} ${pri.name}`,
                0,
                {
                    [pre.effect]: pre.amount,
                    [pri.effect]: pri.amount,
                },
                8,
                GROUP,
            ),
        );
    });
});

basic_fused.push(fused_augments);
