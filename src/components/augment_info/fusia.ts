import { Augment, EFFECTS as eff } from "./_base";

const GROUP = "FUSIA";

export let fusia: Array<Array<Augment>> = [];

let mega: Array<Augment> = [];

mega.push(
    new Augment(
        "megas fusia",
        0,
        {
            [eff.MEL_POTENCY]: 1.01,
            [eff.RNG_POTENCY]: 1.01,
            [eff.TEC_POTENCY]: 1.01,
        },
        4,
        GROUP,
    ),
);
fusia.push(mega);
