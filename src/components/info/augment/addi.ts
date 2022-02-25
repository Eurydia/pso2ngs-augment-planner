import Augment, { AugmentGroup } from "./_base";
import { EFFECTS as eff, ALL_AILMENT_RESIST } from "../_effect";

const GROUP = "ADDI";

let augments: Array<Augment> = [];

const PRIMARY_POT = 1.025;
const PRIMARY = [
    { name: "mel", effect: eff.MEL_POTENCY, amount: PRIMARY_POT },
    { name: "ra", effect: eff.RNG_POTENCY, amount: PRIMARY_POT },
    { name: "tech", effect: eff.TEC_POTENCY, amount: PRIMARY_POT },
];

const PREFIX = [
    { name: "sta", effect: eff.HP, amount: 20 },
    { name: "spi", effect: eff.PP, amount: 6 },
    { name: "deft", effect: eff.FLOOR_POTENCY, amount: 1.025 },
    { name: "gua", effect: eff.DMG_RESIST, amount: 1.025 },
];

PRIMARY.forEach((primary) => {
    PREFIX.forEach((prefix) => {
        augments.push({
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

PRIMARY.forEach((aug) => {
    augments.push({
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

PRIMARY.forEach((aug) => {
    augments.push({
        name: `addi ward${aug.name}`,
        level: 0,
        effects: [
            { effect: aug.effect, amount: aug.amount },
            ...ALL_AILMENT_RESIST.map((effect) => {
                return {
                    effect,
                    amount: 1.2,
                };
            }),
        ],
        battlepower: 10,
        group: GROUP,
    });
});

const ADDI: AugmentGroup = {
    name: GROUP,
    augments,
};

export default ADDI;
