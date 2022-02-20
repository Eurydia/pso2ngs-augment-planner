import { Augment, EFFECTS as eff } from "./_base";

const GROUP = "ELEMENTAL";

export let elemental: Array<Array<Augment>> = [];

let exploit: Array<Augment> = [];

const ELE_AUG = ["fire", "ice", "lightning", "wind"];
ELE_AUG.forEach((ele) => {
    exploit.push(
        new Augment(
            `${ele} exploit`,
            1,
            {
                [eff.MEL_POTENCY]: 1.025,
                [eff.RNG_POTENCY]: 1.025,
                [eff.TEC_POTENCY]: 1.025,
            },
            6,
            GROUP,
        ),
    );
});
elemental.push(exploit);
