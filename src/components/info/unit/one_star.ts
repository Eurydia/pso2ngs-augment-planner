import Unit, { UnitGroup } from "./_base";
import { EFFECTS as eff } from "../_effect";

let units: Unit[] = [];

units.push({
    name: "primm armor",
    effects: [{ effect: eff.HP, amount: 10 }],
});

const ONE_STAR_UNITS: UnitGroup = {
    rarity: 1,
    units,
};

export default ONE_STAR_UNITS;
