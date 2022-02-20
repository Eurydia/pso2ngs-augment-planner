import { Augment, EFFECTS as eff } from "./_base";

const GROUP = "DOMINA";

export let domina: Array<Array<Augment>> = [];

let ael: Array<Augment> = [];
ael.push(
    new Augment(
        "ael domina",
        0,
        {
            [eff.HP]: 5,
            [eff.PP]: 3,
            [eff.MEL_POTENCY]: 1.015,
            [eff.RNG_POTENCY]: 1.015,
            [eff.TEC_POTENCY]: 1.015,
        },
        8,
        GROUP,
    ),
);
domina.push(ael);

let ret: Array<Augment> = [];
ael.push(
    new Augment(
        "ret domina",
        0,
        {
            [eff.HP]: 15,
            [eff.MEL_POTENCY]: 1.015,
            [eff.RNG_POTENCY]: 1.015,
            [eff.TEC_POTENCY]: 1.015,
        },
        10,
        GROUP,
    ),
);
domina.push(ret);
