/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var dex = 10;
/** @type {?} */
var hoursPerDay = 24;
/** @type {?} */
var hoursPerDayHalf = 12;
/** @type {?} */
var minutesPerHour = 60;
/** @type {?} */
var secondsPerMinute = 60;
/**
 * @param {?=} value
 * @return {?}
 */
export function isValidDate(value) {
    if (!value) {
        return false;
    }
    if (value instanceof Date && isNaN(value.getHours())) {
        return false;
    }
    if (typeof value === 'string') {
        return isValidDate(new Date(value));
    }
    return true;
}
/**
 * @param {?} controls
 * @param {?} newDate
 * @return {?}
 */
export function isValidLimit(controls, newDate) {
    if (controls.min && newDate < controls.min) {
        return false;
    }
    if (controls.max && newDate > controls.max) {
        return false;
    }
    return true;
}
/**
 * @param {?} value
 * @return {?}
 */
export function toNumber(value) {
    if (typeof value === 'number') {
        return value;
    }
    return parseInt(value, dex);
}
/**
 * @param {?} value
 * @return {?}
 */
export function isNumber(value) {
    return !isNaN(toNumber(value));
}
/**
 * @param {?} value
 * @param {?=} isPM
 * @return {?}
 */
export function parseHours(value, isPM) {
    if (isPM === void 0) { isPM = false; }
    /** @type {?} */
    var hour = toNumber(value);
    if (isNaN(hour) ||
        hour < 0 ||
        hour > (isPM ? hoursPerDayHalf : hoursPerDay)) {
        return NaN;
    }
    return hour === hoursPerDayHalf && !isPM ? 0 : hour;
}
/**
 * @param {?} value
 * @return {?}
 */
export function parseMinutes(value) {
    /** @type {?} */
    var minute = toNumber(value);
    if (isNaN(minute) || minute < 0 || minute > minutesPerHour) {
        return NaN;
    }
    return minute;
}
/**
 * @param {?} value
 * @return {?}
 */
export function parseSeconds(value) {
    /** @type {?} */
    var seconds = toNumber(value);
    if (isNaN(seconds) || seconds < 0 || seconds > secondsPerMinute) {
        return NaN;
    }
    return seconds;
}
/**
 * @param {?} value
 * @return {?}
 */
export function parseTime(value) {
    if (typeof value === 'string') {
        return new Date(value);
    }
    return value;
}
/**
 * @param {?} value
 * @param {?} diff
 * @return {?}
 */
export function changeTime(value, diff) {
    if (!value) {
        return changeTime(createDate(new Date(), 0, 0, 0), diff);
    }
    /** @type {?} */
    var hour = value.getHours();
    /** @type {?} */
    var minutes = value.getMinutes();
    /** @type {?} */
    var seconds = value.getSeconds();
    if (diff.hour) {
        hour = (hour + toNumber(diff.hour)) % hoursPerDay;
        if (hour < 0) {
            hour += hoursPerDay;
        }
    }
    if (diff.minute) {
        minutes = minutes + toNumber(diff.minute);
    }
    if (diff.seconds) {
        seconds = seconds + toNumber(diff.seconds);
    }
    return createDate(value, hour, minutes, seconds);
}
/**
 * @param {?} value
 * @param {?} opts
 * @return {?}
 */
export function setTime(value, opts) {
    /** @type {?} */
    var hour = parseHours(opts.hour);
    /** @type {?} */
    var minute = parseMinutes(opts.minute);
    /** @type {?} */
    var seconds = parseSeconds(opts.seconds) || 0;
    if (opts.isPM && hour !== 12) {
        hour += hoursPerDayHalf;
    }
    if (!value) {
        if (!isNaN(hour) && !isNaN(minute)) {
            return createDate(new Date(), hour, minute, seconds);
        }
        return value;
    }
    if (isNaN(hour) || isNaN(minute)) {
        return value;
    }
    return createDate(value, hour, minute, seconds);
}
/**
 * @param {?} value
 * @param {?} hours
 * @param {?} minutes
 * @param {?} seconds
 * @return {?}
 */
export function createDate(value, hours, minutes, seconds) {
    return new Date(value.getFullYear(), value.getMonth(), value.getDate(), hours, minutes, seconds, value.getMilliseconds());
}
/**
 * @param {?} value
 * @return {?}
 */
export function padNumber(value) {
    /** @type {?} */
    var _value = value.toString();
    if (_value.length > 1) {
        return _value;
    }
    return "0" + _value;
}
/**
 * @param {?} hours
 * @param {?} isPM
 * @return {?}
 */
export function isHourInputValid(hours, isPM) {
    return !isNaN(parseHours(hours, isPM));
}
/**
 * @param {?} minutes
 * @return {?}
 */
export function isMinuteInputValid(minutes) {
    return !isNaN(parseMinutes(minutes));
}
/**
 * @param {?} seconds
 * @return {?}
 */
export function isSecondInputValid(seconds) {
    return !isNaN(parseSeconds(seconds));
}
/**
 * @param {?} diff
 * @param {?} max
 * @param {?} min
 * @return {?}
 */
export function isInputLimitValid(diff, max, min) {
    /** @type {?} */
    var newDate = setTime(new Date(), diff);
    if (max && newDate > max) {
        return false;
    }
    if (min && newDate < min) {
        return false;
    }
    return true;
}
/**
 * @param {?} hours
 * @param {?=} minutes
 * @param {?=} seconds
 * @param {?=} isPM
 * @return {?}
 */
export function isInputValid(hours, minutes, seconds, isPM) {
    if (minutes === void 0) { minutes = '0'; }
    if (seconds === void 0) { seconds = '0'; }
    return isHourInputValid(hours, isPM)
        && isMinuteInputValid(minutes)
        && isSecondInputValid(seconds);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXBpY2tlci51dGlscy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1ib290c3RyYXAvdGltZXBpY2tlci8iLCJzb3VyY2VzIjpbInRpbWVwaWNrZXIudXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7SUFFTSxHQUFHLEdBQUcsRUFBRTs7SUFDUixXQUFXLEdBQUcsRUFBRTs7SUFDaEIsZUFBZSxHQUFHLEVBQUU7O0lBQ3BCLGNBQWMsR0FBRyxFQUFFOztJQUNuQixnQkFBZ0IsR0FBRyxFQUFFOzs7OztBQUUzQixNQUFNLFVBQVUsV0FBVyxDQUFDLEtBQXFCO0lBQy9DLElBQUksQ0FBQyxLQUFLLEVBQUU7UUFDVixPQUFPLEtBQUssQ0FBQztLQUNkO0lBRUQsSUFBSSxLQUFLLFlBQVksSUFBSSxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRTtRQUNwRCxPQUFPLEtBQUssQ0FBQztLQUNkO0lBRUQsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7UUFDN0IsT0FBTyxXQUFXLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztLQUNyQztJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQzs7Ozs7O0FBRUQsTUFBTSxVQUFVLFlBQVksQ0FBQyxRQUFrQyxFQUFFLE9BQWE7SUFDNUUsSUFBSSxRQUFRLENBQUMsR0FBRyxJQUFJLE9BQU8sR0FBRyxRQUFRLENBQUMsR0FBRyxFQUFFO1FBQzFDLE9BQU8sS0FBSyxDQUFDO0tBQ2Q7SUFFRCxJQUFJLFFBQVEsQ0FBQyxHQUFHLElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxHQUFHLEVBQUU7UUFDMUMsT0FBTyxLQUFLLENBQUM7S0FDZDtJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQzs7Ozs7QUFFRCxNQUFNLFVBQVUsUUFBUSxDQUFDLEtBQXNCO0lBQzdDLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1FBQzdCLE9BQU8s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LE9BQU8sZ0JBQWdCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQztXQUMvQixrQkFBa0IsQ0FBQyxPQUFPLENBQUM7V0FDM0Isa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDbkMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRpbWUsIFRpbWVwaWNrZXJDb21wb25lbnRTdGF0ZSB9IGZyb20gJy4vdGltZXBpY2tlci5tb2RlbHMnO1xuXG5jb25zdCBkZXggPSAxMDtcbmNvbnN0IGhvdXJzUGVyRGF5ID0gMjQ7XG5jb25zdCBob3Vyc1BlckRheUhhbGYgPSAxMjtcbmNvbnN0IG1pbnV0ZXNQZXJIb3VyID0gNjA7XG5jb25zdCBzZWNvbmRzUGVyTWludXRlID0gNjA7XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1ZhbGlkRGF0ZSh2YWx1ZT86IHN0cmluZyB8IERhdGUpOiBib29sZWFuIHtcbiAgaWYgKCF2YWx1ZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmICh2YWx1ZSBpbnN0YW5jZW9mIERhdGUgJiYgaXNOYU4odmFsdWUuZ2V0SG91cnMoKSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBpc1ZhbGlkRGF0ZShuZXcgRGF0ZSh2YWx1ZSkpO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1ZhbGlkTGltaXQoY29udHJvbHM6IFRpbWVwaWNrZXJDb21wb25lbnRTdGF0ZSwgbmV3RGF0ZTogRGF0ZSk6IGJvb2xlYW4ge1xuICBpZiAoY29udHJvbHMubWluICYmIG5ld0RhdGUgPCBjb250cm9scy5taW4pIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAoY29udHJvbHMubWF4ICYmIG5ld0RhdGUgPiBjb250cm9scy5tYXgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvTnVtYmVyKHZhbHVlOiBzdHJpbmcgfCBudW1iZXIpOiBudW1iZXIge1xuICBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBwYXJzZUludCh2YWx1ZSwgZGV4KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTnVtYmVyKHZhbHVlOiBzdHJpbmcgfCBudW1iZXIpOiB2YWx1ZSBpcyBudW1iZXIge1xuICByZXR1cm4gIWlzTmFOKHRvTnVtYmVyKHZhbHVlKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUhvdXJzKFxuICB2YWx1ZTogc3RyaW5nIHwgbnVtYmVyLFxuICBpc1BNID0gZmFsc2Vcbik6IG51bWJlciB7XG4gIGNvbnN0IGhvdXIgPSB0b051bWJlcih2YWx1ZSk7XG4gIGlmIChcbiAgICBpc05hTihob3VyKSB8fFxuICAgIGhvdXIgPCAwIHx8XG4gICAgaG91ciA+IChpc1BNID8gaG91cnNQZXJEYXlIYWxmIDogaG91cnNQZXJEYXkpXG4gICkge1xuICAgIHJldHVybiBOYU47XG4gIH1cblxuICByZXR1cm4gaG91ciA9PT0gaG91cnNQZXJEYXlIYWxmICYmICFpc1BNID8gMCA6IGhvdXI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZU1pbnV0ZXModmFsdWU6IHN0cmluZyB8IG51bWJlcik6IG51bWJlciB7XG4gIGNvbnN0IG1pbnV0ZSA9IHRvTnVtYmVyKHZhbHVlKTtcbiAgaWYgKGlzTmFOKG1pbnV0ZSkgfHwgbWludXRlIDwgMCB8fCBtaW51dGUgPiBtaW51dGVzUGVySG91cikge1xuICAgIHJldHVybiBOYU47XG4gIH1cblxuICByZXR1cm4gbWludXRlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VTZWNvbmRzKHZhbHVlOiBzdHJpbmcgfCBudW1iZXIpOiBudW1iZXIge1xuICBjb25zdCBzZWNvbmRzID0gdG9OdW1iZXIodmFsdWUpO1xuICBpZiAoaXNOYU4oc2Vjb25kcykgfHwgc2Vjb25kcyA8IDAgfHwgc2Vjb25kcyA+IHNlY29uZHNQZXJNaW51dGUpIHtcbiAgICByZXR1cm4gTmFOO1xuICB9XG5cbiAgcmV0dXJuIHNlY29uZHM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVRpbWUodmFsdWU6IHN0cmluZyB8IERhdGUpOiBEYXRlIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gbmV3IERhdGUodmFsdWUpO1xuICB9XG5cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2hhbmdlVGltZSh2YWx1ZTogRGF0ZSwgZGlmZjogVGltZSk6IERhdGUge1xuICBpZiAoIXZhbHVlKSB7XG4gICAgcmV0dXJuIGNoYW5nZVRpbWUoY3JlYXRlRGF0ZShuZXcgRGF0ZSgpLCAwLCAwLCAwKSwgZGlmZik7XG4gIH1cblxuICBsZXQgaG91ciA9IHZhbHVlLmdldEhvdXJzKCk7XG4gIGxldCBtaW51dGVzID0gdmFsdWUuZ2V0TWludXRlcygpO1xuICBsZXQgc2Vjb25kcyA9IHZhbHVlLmdldFNlY29uZHMoKTtcblxuICBpZiAoZGlmZi5ob3VyKSB7XG4gICAgaG91ciA9IChob3VyICsgdG9OdW1iZXIoZGlmZi5ob3VyKSkgJSBob3Vyc1BlckRheTtcbiAgICBpZiAoaG91ciA8IDApIHtcbiAgICAgIGhvdXIgKz0gaG91cnNQZXJEYXk7XG4gICAgfVxuICB9XG5cbiAgaWYgKGRpZmYubWludXRlKSB7XG4gICAgbWludXRlcyA9IG1pbnV0ZXMgKyB0b051bWJlcihkaWZmLm1pbnV0ZSk7XG4gIH1cblxuICBpZiAoZGlmZi5zZWNvbmRzKSB7XG4gICAgc2Vjb25kcyA9IHNlY29uZHMgKyB0b051bWJlcihkaWZmLnNlY29uZHMpO1xuICB9XG5cbiAgcmV0dXJuIGNyZWF0ZURhdGUodmFsdWUsIGhvdXIsIG1pbnV0ZXMsIHNlY29uZHMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0VGltZSh2YWx1ZTogRGF0ZSwgb3B0czogVGltZSk6IERhdGUge1xuICBsZXQgaG91ciA9IHBhcnNlSG91cnMob3B0cy5ob3VyKTtcbiAgY29uc3QgbWludXRlID0gcGFyc2VNaW51dGVzKG9wdHMubWludXRlKTtcbiAgY29uc3Qgc2Vjb25kcyA9IHBhcnNlU2Vjb25kcyhvcHRzLnNlY29uZHMpIHx8IDA7XG5cbiAgaWYgKG9wdHMuaXNQTSAmJiBob3VyICE9PSAxMikge1xuICAgIGhvdXIgKz0gaG91cnNQZXJEYXlIYWxmO1xuICB9XG5cbiAgaWYgKCF2YWx1ZSkge1xuICAgIGlmICghaXNOYU4oaG91cikgJiYgIWlzTmFOKG1pbnV0ZSkpIHtcbiAgICAgIHJldHVybiBjcmVhdGVEYXRlKG5ldyBEYXRlKCksIGhvdXIsIG1pbnV0ZSwgc2Vjb25kcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgaWYgKGlzTmFOKGhvdXIpIHx8IGlzTmFOKG1pbnV0ZSkpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gY3JlYXRlRGF0ZSh2YWx1ZSwgaG91ciwgbWludXRlLCBzZWNvbmRzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZURhdGUoXG4gIHZhbHVlOiBEYXRlLFxuICBob3VyczogbnVtYmVyLFxuICBtaW51dGVzOiBudW1iZXIsXG4gIHNlY29uZHM6IG51bWJlclxuKTogRGF0ZSB7XG4gIHJldHVybiBuZXcgRGF0ZShcbiAgICB2YWx1ZS5nZXRGdWxsWWVhcigpLFxuICAgIHZhbHVlLmdldE1vbnRoKCksXG4gICAgdmFsdWUuZ2V0RGF0ZSgpLFxuICAgIGhvdXJzLFxuICAgIG1pbnV0ZXMsXG4gICAgc2Vjb25kcyxcbiAgICB2YWx1ZS5nZXRNaWxsaXNlY29uZHMoKVxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFkTnVtYmVyKHZhbHVlOiBudW1iZXIpOiBzdHJpbmcge1xuICBjb25zdCBfdmFsdWUgPSB2YWx1ZS50b1N0cmluZygpO1xuICBpZiAoX3ZhbHVlLmxlbmd0aCA+IDEpIHtcbiAgICByZXR1cm4gX3ZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIGAwJHtfdmFsdWV9YDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzSG91cklucHV0VmFsaWQoaG91cnM6IHN0cmluZywgaXNQTTogYm9vbGVhbik6IGJvb2xlYW4ge1xuICByZXR1cm4gIWlzTmFOKHBhcnNlSG91cnMoaG91cnMsIGlzUE0pKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTWludXRlSW5wdXRWYWxpZChtaW51dGVzOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgcmV0dXJuICFpc05hTihwYXJzZU1pbnV0ZXMobWludXRlcykpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTZWNvbmRJbnB1dFZhbGlkKHNlY29uZHM6IHN0cmluZyk6IGJvb2xlYW4ge1xuICByZXR1cm4gIWlzTmFOKHBhcnNlU2Vjb25kcyhzZWNvbmRzKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0lucHV0TGltaXRWYWxpZChkaWZmOiBUaW1lLCBtYXg6IERhdGUsIG1pbjogRGF0ZSk6IGJvb2xlYW4ge1xuICBjb25zdCBuZXdEYXRlID0gc2V0VGltZShuZXcgRGF0ZSgpLCBkaWZmKTtcblxuICBpZiAobWF4ICYmIG5ld0RhdGUgPiBtYXgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAobWluICYmIG5ld0RhdGUgPCBtaW4pIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzSW5wdXRWYWxpZChcbiAgaG91cnM6IHN0cmluZyxcbiAgbWludXRlcyA9ICcwJyxcbiAgc2Vjb25kcyA9ICcwJyxcbiAgaXNQTTogYm9vbGVhblxuKTogYm9vbGVhbiB7XG4gIHJldHVybiBpc0hvdXJJbnB1dFZhbGlkKGhvdXJzLCBpc1BNKVxuICAgICYmIGlzTWludXRlSW5wdXRWYWxpZChtaW51dGVzKVxuICAgICYmIGlzU2Vjb25kSW5wdXRWYWxpZChzZWNvbmRzKTtcbn1cbiJdfQ==