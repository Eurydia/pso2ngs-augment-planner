import { Component } from "react";
import UnitPlanner from "../derived_components/UnitPlanner";
import WeaponPlanner from "../derived_components/WeaponPlanner";
import About from "./About";

import { AugmentSelectorOption } from "../base_components/AugmentSelector";
import { UnitSelectorOption } from "../base_components/UnitSelector";
import StatsDisplay, {
    StatsDisplayValue,
} from "../base_components/StatsDisplay";
import { WeaponSelectorOption } from "../base_components/WeaponSelector";

import { findViolatedAugmentIndex, getTotalEffect } from "./_util";
import { Effect } from "../info/_effect";
import ONE_STAR_UNIT from "../info/unit/one_star";
import NON_ELEMENTAL from "../info/weapon/non_elemental";

type StringKey<T> = {
    [key: string]: T;
};

type AugmentPlannerState = {
    augmentValues: StringKey<AugmentSelectorOption[]>;
    equipmentValues: StringKey<UnitSelectorOption | undefined>;
    plannerStats: StringKey<StatsDisplayValue>;
};

class AugmentPlanner extends Component<{}, AugmentPlannerState> {
    _keys!: string[];
    constructor(props: {}) {
        super(props);

        let augmentValues: { [key: string]: AugmentSelectorOption[] } = {};
        let equipmentValues: StringKey<UnitSelectorOption | undefined> =
            {};
        let plannerStats: StringKey<StatsDisplayValue> = {
            "total-eff": {},
        };

        this._keys = ["weapon-0", "armor-1", "armor-2", "armor-3"];
        this._keys.forEach((key) => {
            augmentValues[key] = [];
            equipmentValues[key] = undefined;
            plannerStats[key] = {};
        });

        this.state = {
            augmentValues,
            equipmentValues,
            plannerStats,
        };

        this.handleEquipmentChange = this.handleEquipmentChange.bind(this);
        this.handleAugmentChange = this.handleAugmentChange.bind(this);
        this.handlePlannerEffectsChange =
            this.handlePlannerEffectsChange.bind(this);
    }

    handlePlannerEffectsChange() {
        this.setState(
            ({ augmentValues, equipmentValues, plannerStats }) => {
                let effects: Effect[] = [];
                this._keys.forEach((key) => {
                    const augment_value_key = augmentValues[key];
                    augment_value_key.forEach((aug_opt) => {
                        if (aug_opt) {
                            const { value: aug_value } = aug_opt;
                            const { effects: aug_effs } = aug_value;
                            aug_effs.forEach((eff) => {
                                effects.push(eff);
                            });
                        }
                    });

                    const equipment_value_key = equipmentValues[key];
                    if (equipment_value_key) {
                        const { value: equipment_value } =
                            equipment_value_key;
                        const { effects: equipment_effs } =
                            equipment_value;
                        equipment_effs.forEach((eff) => {
                            effects.push(eff);
                        });
                    }
                });
                const TOTAL_EFFECTS = getTotalEffect(effects);

                // -------------------------------------------------------------------
                // update state part
                let _plannerStats = { ...plannerStats };
                _plannerStats["total-eff"] = TOTAL_EFFECTS;

                let _state = {
                    plannerStats: _plannerStats,
                };

                return _state;
            },
        );
    }

    handleAugmentChange(
        values: AugmentSelectorOption[],
        planner_index: string,
    ) {
        this.setState(
            ({ augmentValues, equipmentValues, plannerStats }) => {
                // augment part
                const OPTION_INDEX_TO_REMOVE = findViolatedAugmentIndex(
                    values.map(({ value }) => {
                        return value;
                    }),
                );
                const FILTERED_OPTIONS: AugmentSelectorOption[] =
                    values.filter((val, index) => {
                        return !(index in OPTION_INDEX_TO_REMOVE);
                    });

                // -------------------------------------------------------------------
                // effect part
                // update the effect of this planner
                let planner_effect: Effect[] = [];
                FILTERED_OPTIONS.forEach(({ value: aug }) => {
                    aug.effects.forEach((eff) => {
                        planner_effect.push(eff);
                    });
                });
                const this_planner_unit = equipmentValues[planner_index];
                let this_planner_unit_effect: Effect[] =
                    this_planner_unit === undefined
                        ? []
                        : this_planner_unit.value.effects;
                this_planner_unit_effect.forEach((eff) => {
                    planner_effect.push(eff);
                });
                const THIS_PLANNER_EFFECT = getTotalEffect(planner_effect);

                // -------------------------------------------------------------------
                // update state
                // update this planner augment values with FILTERED_OPTIONS
                let _augmentValues = { ...augmentValues };
                _augmentValues[planner_index] = FILTERED_OPTIONS;

                // update the planner effect with THIS_PLANNER_EFFECT
                let _plannerStats = { ...plannerStats };
                _plannerStats[planner_index] = THIS_PLANNER_EFFECT;

                // use _state as a dummy value
                // then return it
                let _state = {
                    augmentValues: _augmentValues,
                    plannerStats: _plannerStats,
                };

                return _state;
            },
        );
        this.handlePlannerEffectsChange();
    }

    handleEquipmentChange(
        value: UnitSelectorOption | WeaponSelectorOption,
        planner_index: string,
    ) {
        this.setState(
            ({ augmentValues, equipmentValues, plannerStats }) => {
                // -------------------------------------------------------------------
                // combine effects on this planner's augment and unit
                let planner_effect: Effect[] = [];
                const this_planner_augment =
                    augmentValues[planner_index] || [];
                // will this cause a type error?
                this_planner_augment.forEach(({ value: aug }) => {
                    aug.effects.forEach((eff) => {
                        planner_effect.push(eff);
                    });
                });
                const equipment = value.value;
                equipment.effects.forEach((eff) => {
                    planner_effect.push(eff);
                });
                const THIS_PLANNER_EFFECT = getTotalEffect(planner_effect);

                // -------------------------------------------------------------------
                // update state part
                let _equipmentValues = { ...equipmentValues };
                _equipmentValues[planner_index] = value;

                let _plannerStats = { ...plannerStats };
                _plannerStats[planner_index] = THIS_PLANNER_EFFECT;

                let _state = {
                    equipmentValues: _equipmentValues,
                    plannerStats: _plannerStats,
                };

                return _state;
            },
        );
        this.handlePlannerEffectsChange();
    }

    render() {
        const {
            augmentValues,
            equipmentValues,
            plannerStats: plannerEffects,
        } = this.state;

        const weapon_id = this._keys[0];
        const PLANNERS = [
            <WeaponPlanner
                _id={weapon_id}
                plannerName="Weapon"
                augmentValue={augmentValues[weapon_id]}
                weaponValue={equipmentValues[weapon_id]}
                stats={plannerEffects[weapon_id]}
                onAugmentChange={this.handleAugmentChange}
                onWeaponChange={this.handleEquipmentChange}
                key={0}
            />,
        ];
        for (let i = 1; i < 4; i++) {
            const _ID = this._keys[i];
            PLANNERS.push(
                <UnitPlanner
                    _id={_ID}
                    plannerName={`Unit #${i}`}
                    augmentValue={augmentValues[_ID]}
                    unitValue={equipmentValues[_ID]}
                    stats={plannerEffects[_ID]}
                    onAugmentChange={this.handleAugmentChange}
                    onUnitChange={this.handleEquipmentChange}
                    key={i}
                />,
            );
        }

        return (
            <div className="container mx-auto py-4 px-8 bg-blue-300/50 grid grid-cols-2 gap-4 text-left text-2xl capitalize">
                <div className="grid gap-4">{PLANNERS}</div>
                <div>
                    <div className="sticky top-4 gap-4 grid">
                        <div className="bg-white/80 rounded-lg shadow-lg shadow-grey-500/80 p-4 text-2xl">
                            <StatsDisplay
                                stats={plannerEffects["total-eff"]}
                            />
                        </div>
                        <About />
                    </div>
                </div>
            </div>
        );
    }
}

export default AugmentPlanner;
