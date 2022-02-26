import Weapon, { WeaponGroup } from "./_base";
import { EFFECTS as eff } from "../_effect";

let weapon: Weapon[] = [];

weapon.push({
    name: "non-elemental",
    effects: [{ effect: eff.FLOOR_POTENCY, amount: 1.75 }],
});

const NON_ELEMENTAL: WeaponGroup = {
    name: "non-elemental",
    weapons: weapon,
};

export default NON_ELEMENTAL;
