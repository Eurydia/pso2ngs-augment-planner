import Unit, { UnitGroup } from "./_base";
import { ARMOR_SUFFIX } from "./_util";
import {
    EFFECTS as eff,
    DOUBLE_OFF_EFF,
    ALL_AILMENT_RESIST,
} from "../_effect";

let units: Unit[] = [];

units.push({
    name: "qual de armor",
    effects: [{ effect: eff.PP, amount: 6 }],
});

ARMOR_SUFFIX.forEach((suffox, index) => {
    units.push({
        name: `qual de armor ${suffox}`,
        effects: [
            { effect: eff.PP, amount: 4 },
            ...DOUBLE_OFF_EFF[index].map((effect) => {
                return { effect, amount: 1.01 };
            }),
        ],
    });
});

units.push({
    name: "cattleya armor",
    effects: [
        { effect: eff.HP, amount: 10 },
        { effect: eff.PP, amount: 1 },
    ],
});

units.push({
    name: "vialto armor",
    effects: [
        { effect: eff.HP, amount: 30 },
        { effect: eff.DMG_RESIST, amount: 1.01 },
    ],
});

ARMOR_SUFFIX.forEach((suffix, index) => {
    units.push({
        name: `vialto armor ${suffix}`,
        effects: [
            { effect: eff.HP, amount: 25 },
            ...DOUBLE_OFF_EFF[index].map((effect) => {
                return { effect, amount: 1.005 };
            }),
            { effect: eff.DMG_RESIST, amount: 1.01 },
        ],
    });
});

units.push({
    name: "geant armor",
    effects: [
        { effect: eff.HP, amount: -20 },
        { effect: eff.PP, amount: 10 },
        ...ALL_AILMENT_RESIST.map((effect) => {
            return {
                effect,
                amount: 0.5,
            };
        }),
    ],
});

const FOUR_STAR_UNIT: UnitGroup = {
    rarity: 4,
    units,
};

export default FOUR_STAR_UNIT;
