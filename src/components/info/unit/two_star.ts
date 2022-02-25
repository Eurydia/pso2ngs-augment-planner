import Unit, { UnitGroup } from "./_base";
import { EFFECTS as eff } from "../_effect";

let units: Unit[] = [];

units.push({
    name: "tzvia armor",
    effects: [{ effect: eff.PP, amount: 2 }],
});

units.push({
    name: "silver primm armor",
    effects: [{ effect: eff.PP, amount: 2 }],
});

const TWO_STAR_UNITS: UnitGroup = {
    rarity: 2,
    units,
};

export default TWO_STAR_UNITS;
