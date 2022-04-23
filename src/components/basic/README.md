# Basic components

I really don't know how to organize these components.

Components in this directory are either 
- completely stateless, or
- not stateless, but they don't manage their own states.

The criteria should be good enough. But here's more info.

## Group one components

Components in this group are the really important ones.
They are used in every major components in some way.  
These components except for `StatsDisplay` have a state.

`PickerOption` is the option rendered on dropdown menu of pickers.

Includes:

- `AugmentPicker`, 
- `EquipmentPicker`, 
- `PresetPicker`, 
- `StatsDisplay`, and
- \*`PickerOption`.

## Group two components

Components in this group are simple and resuable componenets like buttons. They are not used by every major components as such they serve as a macro.

Includes:

- `NameDescFields`,
- `SaveClearButtons`, and
- `TabCombo`.