# Stopwatch <!-- omit in toc -->
> Control muliple stopwatches 

<!-- omit in toc -->
# Table of Contents
- [Features](#features)
- [Additional Notes](#additional-notes)

# Features
- Single click on a stopwatch to start/pause it
- Double click on one of the stopwatches to pause all of them at the same time
- Displayed time is calculated using `Date.prototype.getTime()` ([mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime))
    - Therefore, even if the javascript is paused (e.g. the computer is set to sleep or the phone's screen is off), the stopwatch will still display the time elapsed in real life since the timestamp is stored after clicking on the start button

# Additional Notes
- The precision of the stopwatches are only to seconds
- The entire javascript only use 1 `setInterval()` to update the display time, which is why all the stopwatches tick at the same time
