//Augment Effects
const HP = "HP";
const PP = "PP";

const MEL_POTENCY = "MEL_POTENTCY";
const RNG_POTENCY = "RNG_POTENCY";
const TEC_POTENCY = "TEC_POTENTCY";
const FLOOR_POTENCY = "FLOOR_POTENCY_INCREASE";

const DMG_RESIST = "DMG_RESIST";
const BURN_RESIST = "BURN_RESIST";
const FREEZE_RESIST = "FREEZE_RESIST";
const SHOCK_RESIST = "SHOCK_RESIST";
const BLIND_RESIST = "BLIND_RESIST";
const PANIC_RESIST = "PANIC_RESIST";
const POISON_RESIST = "POISON_RESIST";
const PHYSICAL_DOWN_RESIST = "PHYSICAL_DOWN_RESIST";

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

//Augment base class
export class Augment {
    name: string;
    level: number;
    effects: Array<{ name: string; amount: number }>;
    battlepower: number;
    group: string;

    constructor(
        name: string,
        level: number,
        effects: { [key: string]: number },
        battlepower: number,
        group: string,
    ) {
        this.name = name;
        this.level = level;
        this.effects = [];
        this.battlepower = battlepower;
        this.group = group;
        for (const key in effects) {
            this.effects.push({ name: key, amount: effects[key] });
        }
    }
}

export type AugmentInterface = {
    name: string;
    level: number;
    effects: Array<{ name: string; amount: number }>;
    battlepower: number;
    group: string;
};

export function createMultipleAugments(
    level_count: number,
    name: string,
    effects: { [key: string]: Array<number> },
    battlepower: Array<number>,
    group: string,
): Array<Augment> {
    // Store created augments
    let augments: Array<Augment> = [];

    // for each level specified create a new augment
    for (let i = 0; i < level_count; i++) {
        let aug_eff: { [ket: string]: number } = {};
        Object.entries(effects).forEach(
            ([key, val]) => (aug_eff[key] = val[i]),
        );
        const AUG_LEVEL = i + 1;
        const AUG_BP = battlepower[i];

        // add augment array
        augments.push(
            new Augment(name, AUG_LEVEL, aug_eff, AUG_BP, group),
        );
    }
    return augments;
}
