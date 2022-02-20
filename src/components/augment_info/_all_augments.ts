import { Augment } from "./_base";
import { basic } from "./basic";
import { basic_fused } from "./basic_fused";
import { dualble } from "./dualble";
import { ward } from "./ward";
import { soul } from "./soul";
import { note } from "./note";
import { domina } from "./domina";
import { secreata } from "./secreta";
import { dread } from "./dread";
import { gigas } from "./gigas";
import { elemental } from "./elemental";
import { fusia } from "./fusia";
import { addi } from "./addi";

function addAugmentToPool(
    arr: Array<Array<Augment>>,
    target: Array<Augment>,
): void {
    arr.forEach((aug_arr) => {
        aug_arr.forEach((aug) => {
            target.push(aug);
        });
    });
}

export let all_augments: Array<Augment> = [];

const AUG_GROUP = [
    basic,
    basic_fused,
    dualble,
    ward,
    soul,
    note,
    domina,
    secreata,
    dread,
    gigas,
    elemental,
    fusia,
    addi,
];
AUG_GROUP.forEach((aug) => {
    addAugmentToPool(aug, all_augments);
});

// fs.writeFileSync(
//     "./src/components/augment_info/augments_data.json",
//     JSON.stringify(all_augments),
// );
