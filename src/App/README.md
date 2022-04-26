# App

This act as the store for `AugmentPreset` and `LoadoutPreset`.
Sessions are saved on localStorage.

## Information about files

- `handlers.ts` contains handlers for preset actions.   
    Such as 

   - adding, 
   - editing, 
   - deleting, as well as
   - importing and exporting of presets.

- `session.ts` contains functions for setting and getting data from localStorage.

- `conversion.ts` contains conversion functions.

- `typeguard.ts` contains runtime type guard to perform unsanitized data.