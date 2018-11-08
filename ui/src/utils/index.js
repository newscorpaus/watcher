import moment from 'moment'

function isEventTimeOut(events) {
    const lastEvent = events[events.length - 1]
    const beforeLastEvent = events[events.length - 1]

    return moment(lastEvent) - moment(beforeLastEvent)
}

export function getStatus(valid, events) {
    if (valid && events.length >= 8) {
        return "Completed"
    } else if (!valid && events.length < 8 && !isEventTimeOut(events)) {
        return "Pending"
    } else {
        return "InCompleted"
    }
}

// function testTimeout() {
//     const timeNow = new Date.now()
//     const future = moment(timeNow).add(10, 'minute')

//     const test = moment(future) - moment(timeNow)

//     console.log(test)
// }

// testTimeout()