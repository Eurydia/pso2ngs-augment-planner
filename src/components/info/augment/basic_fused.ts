import Augment, { AugmentGroup } from "./_base";
import { EFFECTS as eff } from "../_effect";

export const GROUP = "BASIC_FUSED";

const PRIMARY_POT = 1.02;
const PRIMARY = [
    { name: "might", effect: eff.MEL_POTENCY, amount: PRIMARY_POT },
    { name: "precision", effect: eff.RNG_POTENCY, amount: PRIMARY_POT },
    { name: "technique", effect: eff.TEC_POTENCY, amount: PRIMARY_POT },
];

const PREFIX = [
    { name: "sta", effect: eff.HP, amount: 15 },
    { name: "spi", effect: eff.PP, amount: 5 },
    { name: "deft", effect: eff.FLOOR_POTENCY, amount: 1.02 },
    { name: "gua", effect: eff.DMG_RESIST, amount: 1.02 },
];

let augments: Array<Augment> = [];
PRIMARY.forEach((primary) => {
    PREFIX.forEach((prefix) => {
        augments.push({
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

const BASIC_FUSED: AugmentGroup = {
    name: GROUP,
    augments,
};

export default BASIC_FUSED;
