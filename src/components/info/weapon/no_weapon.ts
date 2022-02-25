import Weapon, { WeaponGroup } from "./_base";

let weapons: Weapon[] = [];

weapons.push({
    name: "no weapon",
    effects: [],
});

const NO_WEAPON: WeaponGroup = {
    name: "no weapon",
    weapons: weapons,
};

export default NO_WEAPON;
