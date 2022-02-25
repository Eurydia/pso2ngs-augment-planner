import Augment, { AugmentGroup } from "./_base";
import { createMultipleAugments } from "./_util";
import { ALL_AILMENT_RESIST, SINGLE_AILMENT_RESIST } from "../_effect";

const GROUP = "WARD";

let augments: Augment[] = [];
["burn", "freeze", "shock", "blind", "panic", "poison", "pain"].forEach(
    (name, index) => {
        createMultipleAugments(
            `${name} ward`,
            3,
            SINGLE_AILMENT_RESIST[index].map((effect) => {
                return { effect, amount: [1.2, 1.25, 1.3] };
            }),
            [4, 5, 6],
            GROUP,
        ).forEach((aug) => {
            augments.push(aug);
        });
    },
);
createMultipleAugments(
    "sovereign Ward",
    3,
    ALL_AILMENT_RESIST.map((effect) => {
        return {
            effect,
            amount: [1.2, 1.25, 1.3],
        };
    }),
    [6, 8, 10],
    GROUP,
).forEach((aug) => {
    augments.push(aug);
});

const WARD: AugmentGroup = {
    name: GROUP,
    augments,
};

export default WARD;
