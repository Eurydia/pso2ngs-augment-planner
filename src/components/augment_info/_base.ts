//Augment Effects
type EffectStackingType = "multiply" | "add";
type Effect = { name: string; stacking: EffectStackingType };

const HP: Effect = { name: "HP", stacking: "add" };
const PP: Effect = { name: "PP", stacking: "add" };
const MEL_POTENCY: Effect = {
    name: "MEL_POTENTCY",
    stacking: "multiply",
};
const RNG_POTENCY: Effect = {
    name: "RNG_POTENCY",
    stacking: "multiply",
};
const TEC_POTENCY: Effect = {
    name: "TEC_POTENTCY",
    stacking: "multiply",
};
const FLOOR_POTENCY: Effect = {
    name: "FLOOR_POTENCY_INCREASE",
    stacking: "multiply",
};
const DMG_RESIST: Effect = {
    name: "DMG_RESIST",
    stacking: "multiply",
};
const BURN_RESIST: Effect = {
    name: "BURN_RESIST",
    stacking: "multiply",
};
const FREEZE_RESIST: Effect = {
    name: "FREEZE_RESIST",
    stacking: "multiply",
};
const SHOCK_RESIST: Effect = {
    name: "SHOCK_RESIST",
    stacking: "multiply",
};
const BLIND_RESIST: Effect = {
    name: "BLIND_RESIST",
    stacking: "multiply",
};
const PANIC_RESIST: Effect = {
    name: "PANIC_RESIST",
    stacking: "multiply",
};
const POISON_RESIST: Effect = {
    name: "POISON_RESIST",
    stacking: "multiply",
};
const PHYSICAL_DOWN_RESIST: Effect = {
    name: "PHYSICAL_DOWN_RESIST",
    stacking: "multiply",
};

export const EFFECTS = {
    HP,
    PP,
    MEL_POTENCY,
    RNG_POTENCY,
    TEC_POTENCY,
    FLOOR_POTENCY,
    DMG_RESIST,
    BURN_RESIST,
    FREEZE_RESIST,
    SHOCK_RESIST,
    BLIND_RESIST,
    PANIC_RESIST,
    POISON_RESIST,
    PHYSICAL_DOWN_RESIST,
};

type AugmentEffect = {
    effect: Effect;
    amount: number;
};

export type Augment = {
    name: string;
    level: number;
    effects: Array<AugmentEffect>;
    battlepower: number;
    group: string;
};

export function createMultipleAugments(
    name: string,
    levels: number,
    effect_lvl: Array<{ effect: Effect; amount: Array<number> }>,
    battlepowers: Array<number>,
    group: string,
): Array<Augment> {
    // Store created augments
    let augments: Array<Augment> = [];

    // for each level specified create a new augment
    for (let i = 0; i < levels; i++) {
        let effects: Array<AugmentEffect> = [];

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
