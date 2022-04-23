# StatsDisplay

Group and display stats.

`StatsDisplay` is mostly just layout for `StatsItem` which is where the display logic is.

The idea for `StatsItem`, however, is to make it as dumb as possible. Calculations should be don't outside. The only thing `StatsItem` needs to know is **what** to display and **how** to display it. Its logic should be kept as simple as possible.