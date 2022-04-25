# App

This act as the store for `Augment Preset` and `LoadoutPreset`. It process data from `localStorage` as well as imported data to make sure that they won't break the app.

`handlers.ts` contains functions which handle preset actions. Such as adding, editing, deleting as well as importing and exporting of presets.

`session.ts` contains functions for setting and getting data from `localStorage`.

`signature_conversion.ts` contains functions which either strip presets down to their signature for exporting, or rebuilding **sanizied** presets from importing.

`typeguard.ts` contains functions which perform ***runtime*** type guard on unsanitized data to make sure the app won't break.