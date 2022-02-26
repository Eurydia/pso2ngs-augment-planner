import Weapon, { WeaponGroup } from "./_base";
import { EFFECTS as eff } from "../_effect";

let weapon: Weapon[] = [];

weapon.push({
    name: "elemental",
    effects: [{ effect: eff.FLOOR_POTENCY, amount: 1.7 }],
});

const ELEMENTAL: WeaponGroup = {
    name: "elemental",
    weapons: weapon,
};

export default ELEMENTAL;
