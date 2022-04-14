// describe an effect e.g. HP, PP, mel pot etc.
export interface Effect {
    eff: string;
    amt: number;
}

// describe an augment e.g. stamina I, addis
export interface AugmentData {
    name: string;
    level: number;
    effs: Effect[];
    group: string;
    conflict: string[];
    condition: string;
}

// describe an equipment e.g. weapons and units
export interface EquipmentData {
    name: string;
    effs: Effect[];
    group: string;
}

export interface AugmentSignature {
    name: string;
    level: number;
}

// describe an augment preset
export interface AugmentPreset {
    name: string;
    description: string;
    augments: AugmentSignature[];
}
