import { Component } from "react";
import UnitPlanner from "./derived_component/UnitPlanner";
import WeaponPlanner from "./derived_component/WeaponPlanner";

import { AugmentSelectorOption } from "./base_component/AugmentSelector";
import { UnitSelectorOption } from "./base_component/UnitSelector";
import StatsDisplay, {
    StatsDisplayValue,
} from "./base_component/StatsDisplay";

import { findViolatedAugmentIndex, getTotalEffect } from "./_util";
import { Effect } from "./info/_effect";
import { WeaponSelectorOption } from "./base_component/WeaponSelector";

type StringKey<T> = {
    [key: string]: T;
};

type CharacterPlannerState = {
    augmentValues: StringKey<AugmentSelectorOption[]>;
    equipmentValues: StringKey<UnitSelectorOption | undefined>;
    plannerEffects: StringKey<StatsDisplayValue>;
};

class CharacterPlanner extends Component<{}, CharacterPlannerState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            augmentValues: {
                "weapon-0": [],
                "armor-1": [],
                "armor-2": [],
                "armor-3": [],
            },
            equipmentValues: {
                "weapon-0": undefined,
                "armor-1": undefined,
                "armor-2": undefined,
                "armor-3": undefined,
            },
            plannerEffects: {
                "weapon-0": {},
                "armor-1": {},
                "armor-2": {},
                "armor-3": {},
                "total-eff": {},
            },
        };

        this.handleEquipmentChange = this.handleEquipmentChange.bind(this);
        this.handleAugmentChange = this.handleAugmentChange.bind(this);
        this.handlePlannerEffectsChange =
            this.handlePlannerEffectsChange.bind(this);
    }

    handlePlannerEffectsChange() {
        this.setState(
            ({ augmentValues, equipmentValues, plannerEffects }) => {
                let effects: Effect[] = [];
                for (const key in augmentValues) {
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
                }
                const TOTAL_EFFECTS = getTotalEffect(effects);
                // -------------------------------------------------------------------
                // update state part

                let _plannerEffects = { ...plannerEffects };
                _plannerEffects["total-eff"] = TOTAL_EFFECTS;

                let _state = {
                    augmentValues,
                    equipmentValues,
                    plannerEffects: _plannerEffects,
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
            ({ augmentValues, equipmentValues, plannerEffects }) => {
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
                let _plannerEffect = { ...plannerEffects };
                _plannerEffect[planner_index] = THIS_PLANNER_EFFECT;

                // use _state as a dummy value
                // then return it
                let _state = {
                    augmentValues: _augmentValues,
                    equipmentValues,
                    plannerEffects: _plannerEffect,
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
            ({ augmentValues, equipmentValues, plannerEffects }) => {
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

                let _plannerEffect = { ...plannerEffects };
                _plannerEffect[planner_index] = THIS_PLANNER_EFFECT;

                let _state = {
                    augmentValues,
                    equipmentValues: _equipmentValues,
                    plannerEffects: _plannerEffect,
                };

                return _state;
            },
        );
        this.handlePlannerEffectsChange();
    }

    render() {
        const { augmentValues, equipmentValues, plannerEffects } =
            this.state;

        const PLANNERS = [
            // <WeaponPlanner
            //     _id="weapon-0"
            //     augmentValue={augmentValues[0]}
            //     weaponValue={equipmentValues["weapon-0"]}
            //     stats={plannerEffects["weapon-0"]}
            //     onAugmentChange={this.handleAugmentChange}
            //     onWeaponChange={this.handleEquipmentChange}
            //     key={0}
            // />,
        ];
        for (let i = 1; i < 4; i++) {
            const _ID = `armor-${i}`;
            PLANNERS.push(
                <UnitPlanner
                    _id={_ID}
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
            <div className="container grid grid-cols-2 gap-4">
                <div className="grid grid-1 gap-4">{PLANNERS}</div>
                <StatsDisplay stats={plannerEffects["total-eff"]} />
            </div>
        );
    }
}

export default CharacterPlanner;
