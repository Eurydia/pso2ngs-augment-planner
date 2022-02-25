import Weapon, { WeaponGroup } from "./_base";
import { EFFECTS as eff } from "../_effect";

let weapons: Weapon[] = [];

weapons.push({
    name: "no weapon",
    effects: [
        {
            effect: eff.FLOOR_POTENCY,
            amount: 0,
        },
    ],
});

const NO_WEAPON: WeaponGroup = {
    name: "no weapon",
    weapons: weapons,
};

export default NO_WEAPON;
