import Augment, { AugmentGroup } from "./_base";
import { EFFECTS as eff, TRIPLE_OFF_EFF } from "../_effect";

const GROUP = "DOMINA";

let augments: Array<Augment> = [];

augments.push({
    name: "ael domina",
    level: 0,
    effects: [
        { effect: eff.HP, amount: 5 },
        { effect: eff.PP, amount: 3 },
        ...TRIPLE_OFF_EFF.map((effect) => {
            return {
                effect,
                amount: 1.015,
            };
        }),
    ],
    battlepower: 8,
    group: GROUP,
});

augments.push({
    name: "ret domina",
    level: 0,
    effects: [
        { effect: eff.HP, amount: 15 },
        ...TRIPLE_OFF_EFF.map((effect) => {
            return {
                effect,
                amount: 1.015,
            };
        }),
    ],
    battlepower: 10,
    group: GROUP,
});

const DOMINA: AugmentGroup = {
    name: GROUP,
    augments,
};

export default DOMINA;
