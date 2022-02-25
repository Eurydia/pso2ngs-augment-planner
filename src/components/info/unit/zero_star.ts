import Unit, { UnitGroup } from "./_base";

let units: Unit[] = [];

units.push({
    name: "no armor",
    effects: [],
});

const ZERO_STAR_UNTIS: UnitGroup = {
    rarity: 0,
    units,
};

export default ZERO_STAR_UNTIS;
