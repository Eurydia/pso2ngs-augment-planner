import Augment from "../info/augment/_base";
import { GROUP as BASIC_GROUP } from "../info/augment/basic";
import { GROUP as BASIC_FUSED_GROUP } from "../info/augment/basic_fused";
import { Effect } from "../info/_effect";

function isSame(aug_one: string, aug_two: string): boolean {
    return aug_one === aug_two;
}

export function findViolatedAugmentIndex(
    augs_to_check: Augment[],
): number[] {
    const NEW_AUG = augs_to_check.pop();
    if (NEW_AUG === undefined) {
        return [];
    }

    const { name: NEW_AUG_NAME, group: NEW_AUG_GROUP } = NEW_AUG;

    let aug_to_remove: number[] = [];
    for (let i = 0; i < augs_to_check.length; i++) {
        const PREVIOUS_AUG = augs_to_check[i];
        const { name: PREVIOUS_AUG_NAME, group: PREVIOUS_AUG_GROUP } =
            PREVIOUS_AUG;

        // check same name
        const IS_SAME_NAME = isSame(NEW_AUG_NAME, PREVIOUS_AUG_NAME);

        // Check same group except "BASIC"
        const IS_SAME_GROUP =
            isSame(NEW_AUG_GROUP, PREVIOUS_AUG_GROUP) &&
            !isSame(NEW_AUG_GROUP, BASIC_GROUP);

        // If new group is "BASIC",
        // remove any "BASIC_FUSED"
        const IS_BASIC_ON_FUSED =
            isSame(NEW_AUG_GROUP, BASIC_GROUP) &&
            isSame(PREVIOUS_AUG_GROUP, BASIC_FUSED_GROUP);

        // If new group is "BASIC_FUSED",
        // remove any "BASIC"
        const IS_FUSED_ON_BASIC =
            isSame(NEW_AUG_GROUP, BASIC_FUSED_GROUP) &&
            isSame(PREVIOUS_AUG_GROUP, BASIC_GROUP);

        if (
            IS_SAME_NAME ||
            IS_SAME_GROUP ||
            IS_BASIC_ON_FUSED ||
            IS_FUSED_ON_BASIC
        ) {
            aug_to_remove.push(i);
        }
    }

    // Removing index from array
    aug_to_remove.reverse();

    return aug_to_remove;
}

export function getTotalEffect(effects: Effect[]): {
    [key: string]: Effect;
} {
    let total_effects: { [key: string]: Effect } = {};

    effects.forEach((eff) => {
        const { effect, amount } = eff;
        const { name, stacking } = effect;

        if (name in total_effects) {
            const { effect, amount: prev_amount } = total_effects[name];
            const new_amount =
                stacking === "multiply"
                    ? prev_amount * amount
                    : prev_amount + amount;
            total_effects[name] = {
                effect,
                amount: new_amount,
            };
        } else {
            total_effects[name] = eff;
        }
    });

    return total_effects;
}
