import { augmentFromSignature } from "../../util";
import { AugmentPreset, AugmentData } from "../../../types";

// -----------------------------------
export const collectAugmentsFromPreset = (preset: AugmentPreset) => {
    const signatures = preset.augments;
    let augments: AugmentData[] = [];
    for (const signature of signatures) {
        const aug = augmentFromSignature(signature);
        if (aug !== null) {
            augments.push(aug);
        }
    }
    return augments;
};
// -----------------------------------
