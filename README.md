# Stopwatch

> control multiple concurrent stopwatches

# Features

- displayed time is updated synchonously, using a single `setInterval()`
- displayed time is calculated with `Date.prototype.getTime()`
  - so even if the computer is set to sleep or the phone's screen is off, a started stopwatch will still display time elapsed in real life
- when the browser tab is closed, all stopwatch times will be stored into `localStorage`
  - so the recorded times will not be lost
