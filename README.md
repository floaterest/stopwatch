# Stopwatch

> control multiple concurrent stopwatches

## Features

### Display

- displayed time is updated synchonously, using a single `setInterval()`
- displayed time is calculated with `Date.prototype.getTime()`
  - so even if the computer is set to sleep or the phone's screen is off, a started stopwatch will still display time elapsed in real life

### Input
- when paused, stopwatches are editable
  - e.g. change to `02:99:69` will set stopwatch to 03:40:09
  - e.g. change to `65536` will set stopwatch to 18:12:16 (i.e. 65536 seconds)
- new stopwatches can be added by entering a set of names (space sperated)
  - names should be distinct (to delete stopwatches at $\mathcal O(1)$ time)
  - use `@` to specify initial duration (default is 0)
  - the reset button will reset stopwatch to its initial duration
  - e.g. enter `a o e u` will create stopwatches named "a", "o", "e", and "u"
  - e.g. enter `q@900 w@00:15:00` will create stopwatches named "q" and "w" that starts at 00:15:00 as their initial duration
- increment can be changed
  - an increment of $n$ means for each second passed, $n$ seconds will be added to all stopwatches that are on
  - e.g. increment of -1 can be used as timer (i.e. countdown)
  - if increment is negative and stopwatch is at 00:00:00, the stopwatch will stay at 00:00:00 for the next second

### Storage

- stopwatches are stored in `localStorage`
  - all stopwatches displayed time will be save to `localStorage` on each user actions (turn on/off an stopwatch, add new stopwatches, etc)
