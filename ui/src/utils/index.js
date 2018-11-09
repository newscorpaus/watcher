import moment from 'moment'

function isEventTimeOut(events) {
    const lastEvent = events[events.length - 1]
    const beforeLastEvent = events[events.length - 1]

    return moment(lastEvent) - moment(beforeLastEvent)
}

export function getStatus(valid, events) {
    if (valid && events.length >= 8) {
        return "complete"
    } else if (!valid && events.length < 8 && !isEventTimeOut(events)) {
        return "pending"
    } else {
        return "fail"
    }
}

