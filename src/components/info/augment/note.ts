import Augment, { AugmentGroup } from "./_base";
import {
    EFFECTS as eff,
    SINGLE_OFF_EFF,
    DOUBLE_OFF_EFF,
    TRIPLE_OFF_EFF,
} from "../_effect";

const GROUP = "NOTE";

let augments: Array<Augment> = [];

[
    {
        name: "a",
        effects: [
            { effect: eff.HP, amount: 5 },
            { effect: eff.PP, amount: 3 },
        ],
    },
    ...["b", "c", "d"].map((name, index) => {
        return {
            name,
            effects: DOUBLE_OFF_EFF[index].map((effect) => {
                return { effect, amount: 1.01 };
            }),
        };
    }),
].forEach(({ name, effects }) => {
    augments.push({
        name: `ael note ${name}`,
        level: 0,
        effects,
        battlepower: 4,
        group: GROUP,
    });
});

["magnus", "lab", "resola"]
    .map((name, index) => {
        return {
            name,
            effects: SINGLE_OFF_EFF[index].map((effect) => {
                return {
                    effect,
                    amount: 1.015,
                };
            }),
        };
    })
    .forEach(({ name, effects }) => {
        augments.push({
            name: `${name} note`,
            level: 0,
            effects,
            battlepower: 5,
            group: GROUP,
        });
    });

[
    {
        name: "a",
        effects: [{ effect: eff.HP, amount: 10 }],
    },
    ...["b", "c", "d"].map((name, index) => {
        return {
            name,
            effects: [
                { effect: eff.HP, amount: 5 },
                ...DOUBLE_OFF_EFF[index].map((effect) => {
                    return { effect, amount: 1.0075 };
                }),
            ],
        };
    }),
].forEach(({ name, effects }) => {
    augments.push({
        name: `ret note ${name}`,
        level: 0,
        effects,
        battlepower: 4,
        group: GROUP,
    });
});

[
    {
        name: "alno",
        effects: [
            { effect: eff.HP, amount: 10 },
            { effect: eff.PP, amount: 3 },
            { effect: eff.FLOOR_POTENCY, amount: 1.02 },
        ],
    },
    {
        name: "maqea",
        effects: TRIPLE_OFF_EFF.map((effect) => {
            return {
                effect,
                amount: 1.0125,
            };
        }),
    },
].forEach(({ name, effects }) => {
    augments.push({
        name: `${name} note`,
        level: 0,
        effects,
        battlepower: 5,
        group: GROUP,
    });
});

const NOTE: AugmentGroup = {
    name: GROUP,
    augments,
};

export default NOTE;
