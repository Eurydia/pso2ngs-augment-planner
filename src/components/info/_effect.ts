// Base effects
type EffectStackingType = "multiply" | "add";

export type EffectType = { name: string; stacking: EffectStackingType };

const HP: EffectType = { name: "HP", stacking: "add" };
const PP: EffectType = { name: "PP", stacking: "add" };
const MEL_POTENCY: EffectType = {
    name: "MEL_POTENTCY",
    stacking: "multiply",
};
const RNG_POTENCY: EffectType = {
    name: "RNG_POTENCY",
    stacking: "multiply",
};
const TEC_POTENCY: EffectType = {
    name: "TEC_POTENTCY",
    stacking: "multiply",
};
const FLOOR_POTENCY: EffectType = {
    name: "FLOOR_POTENCY",
    stacking: "multiply",
};
const DMG_RESIST: EffectType = {
    name: "DMG_RESIST",
    stacking: "multiply",
};
const BURN_RESIST: EffectType = {
    name: "BURN_RESIST",
    stacking: "multiply",
};
const FREEZE_RESIST: EffectType = {
    name: "FREEZE_RESIST",
    stacking: "multiply",
};
const SHOCK_RESIST: EffectType = {
    name: "SHOCK_RESIST",
    stacking: "multiply",
};
const BLIND_RESIST: EffectType = {
    name: "BLIND_RESIST",
    stacking: "multiply",
};
const PANIC_RESIST: EffectType = {
    name: "PANIC_RESIST",
    stacking: "multiply",
};
const POISON_RESIST: EffectType = {
    name: "POISON_RESIST",
    stacking: "multiply",
};
const PHYSICAL_DOWN_RESIST: EffectType = {
    name: "PHYSICAL_DOWN_RESIST",
    stacking: "multiply",
};

export const EFFECTS: { [key: string]: EffectType } = {
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

export type Effect = {
    effect: EffectType;
    amount: number;
};

export const SINGLE_OFF_EFF: EffectType[][] = [
    [MEL_POTENCY],
    [RNG_POTENCY],
    [TEC_POTENCY],
];

export const DOUBLE_OFF_EFF: EffectType[][] = [
    [MEL_POTENCY, RNG_POTENCY],
    [MEL_POTENCY, TEC_POTENCY],
    [RNG_POTENCY, TEC_POTENCY],
];

export const TRIPLE_OFF_EFF: EffectType[] = [
    MEL_POTENCY,
    RNG_POTENCY,
    TEC_POTENCY,
];

export const SINGLE_AILMENT_RESIST: EffectType[][] = [
    [BURN_RESIST],
    [FREEZE_RESIST],
    [SHOCK_RESIST],
    [BLIND_RESIST],
    [PANIC_RESIST],
    [POISON_RESIST],
    [PHYSICAL_DOWN_RESIST],
];

export const ALL_AILMENT_RESIST: EffectType[] = [
    BURN_RESIST,
    FREEZE_RESIST,
    SHOCK_RESIST,
    BLIND_RESIST,
    PANIC_RESIST,
    POISON_RESIST,
    PHYSICAL_DOWN_RESIST,
];
