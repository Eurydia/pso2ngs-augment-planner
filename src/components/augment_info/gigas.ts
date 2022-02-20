import { Augment, createMultipleAugments, EFFECTS as eff } from "./_base";

const GROUP = "GIGAS";

export let gigas: Array<Array<Augment>> = [];

const GIGAS_AUG = [
    { name: "might", eff: eff.MEL_POTENCY },
    { name: "precision", eff: eff.RNG_POTENCY },
    { name: "technique", eff: eff.TEC_POTENCY },
];

GIGAS_AUG.forEach((aug) => {
    gigas.push(
        createMultipleAugments(
            3,
            `gigas ${aug.name}`,
            {
                [eff.HP]: [5, 10, 15],
                [aug.eff]: [1.015, 1.02, 1.025],
            },
            [6, 8, 10],
            GROUP,
        ),
    );
});
