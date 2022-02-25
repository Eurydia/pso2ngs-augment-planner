import { EffectType, Effect } from "../_effect";

import Augment from "./_base";

export function createMultipleAugments(
    name: string,
    levels: number,
    effect_lvl: Array<{ effect: EffectType; amount: Array<number> }>,
    battlepowers: Array<number>,
    group: string,
): Array<Augment> {
    // Store created augments
    let augments: Array<Augment> = [];

    // for each level specified create a new augment
    for (let i = 0; i < levels; i++) {
        let effects: Array<Effect> = [];

        effect_lvl.forEach((eff) => {
            effects.push({
                effect: eff.effect,
                amount: eff.amount[i],
            });
        });
        const level = i + 1;
        const battlepower = battlepowers[i];

        // add augment array
        augments.push({
            name,
            level,
            effects,
            battlepower,
            group,
        });
    }
    return augments;
}
