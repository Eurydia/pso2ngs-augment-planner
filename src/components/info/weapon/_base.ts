import { Effect } from "../_effect";

type Weapon = {
    name: string;
    effects: Effect[];
};

export type WeaponGroup = {
    name: string;
    weapons: Weapon[];
};

export default Weapon;
