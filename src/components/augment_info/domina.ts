import { Augment, EFFECTS as eff } from "./_base";

const GROUP = "DOMINA";

export let domina: Array<Array<Augment>> = [];

let ael: Array<Augment> = [];
const AEL_POT = 1.015;
ael.push({
    name: "ael domina",
    level: 0,
    effects: [
        { effect: eff.HP, amount: 5 },
        { effect: eff.PP, amount: 3 },
        { effect: eff.MEL_POTENCY, amount: AEL_POT },
        { effect: eff.RNG_POTENCY, amount: AEL_POT },
        { effect: eff.TEC_POTENCY, amount: AEL_POT },
    ],
    battlepower: 8,
    group: GROUP,
});
domina.push(ael);

let ret: Array<Augment> = [];
const RET_POT = 1.015;
ael.push({
    name: "ret domina",
    level: 0,
    effects: [
        { effect: eff.HP, amount: 15 },
        { effect: eff.MEL_POTENCY, amount: RET_POT },
        { effect: eff.RNG_POTENCY, amount: RET_POT },
        { effect: eff.TEC_POTENCY, amount: RET_POT },
    ],
    battlepower: 10,
    group: GROUP,
});
domina.push(ret);
