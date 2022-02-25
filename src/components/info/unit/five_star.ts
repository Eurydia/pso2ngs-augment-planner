import Unit, { UnitGroup } from "./_base";
import { ARMOR_SUFFIX } from "./_util";
import {
    EFFECTS as eff,
    SINGLE_OFF_EFF,
    DOUBLE_OFF_EFF,
    TRIPLE_OFF_EFF,
    ALL_AILMENT_RESIST,
} from "../_effect";

let units: Unit[] = [];

units.push({
    name: "vidal armor",
    effects: [{ effect: eff.HP, amount: 70 }],
});

units.push({
    name: "vijf armor",
    effects: [
        { effect: eff.HP, amount: 30 },
        { effect: eff.PP, amount: 4 },
    ],
});

ARMOR_SUFFIX.forEach((name, index) => {
    units.push({
        name: `vijf armor ${name}`,
        effects: [
            { effect: eff.HP, amount: 20 },
            { effect: eff.PP, amount: 7 },
            ...DOUBLE_OFF_EFF[index].map((effect) => {
                return {
                    effect,
                    amount: 1.01,
                };
            }),
        ],
    });
});

units.push({
    name: "vios armor",
    effects: [
        { effect: eff.PP, amount: 8 },
        ...TRIPLE_OFF_EFF.map((effect) => {
            return {
                effect,
                amount: 1.01,
            };
        }),
    ],
});

units.push({
    name: "vindalun armor",
    effects: [{ effect: eff.HP, amount: 70 }],
});

units.push({
    name: "greas armor",
    effects: [
        { effect: eff.HP, amount: -40 },
        { effect: eff.PP, amount: 13 },
        ...TRIPLE_OFF_EFF.map((effect) => {
            return {
                effect,
                amount: 1.02,
            };
        }),
        ...ALL_AILMENT_RESIST.map((effect) => {
            return {
                effect,
                amount: 0.5,
            };
        }),
    ],
});

["schwarzest", "schwarzgarde", "schwarzrosso"].forEach((name, index) => {
    units.push({
        name: `${name} armor`,
        effects: [
            { effect: eff.HP, amount: 25 },
            { effect: eff.PP, amount: 3 },
            ...SINGLE_OFF_EFF[index].map((effect) => {
                return {
                    effect,
                    amount: 1.02,
                };
            }),
            { effect: eff.DMG_RESIST, amount: 1.01 },
        ],
    });
});

const FIVE_STAR_UNIT: UnitGroup = {
    rarity: 5,
    units,
};

export default FIVE_STAR_UNIT;
