export interface Effect {
    eff: string;
    amt: number;
}

export interface AugmentData {
    name: string;
    level: number;
    effs: Effect[];
    group: string;
    conflict: string[];
    condition: string;
}

export interface EquipmentData {
    name: string;
    effs: Effect[];
    group: number;
}
