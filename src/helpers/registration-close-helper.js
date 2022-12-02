import moment from 'moment';

export const isRegistClosed = () => {
    let status;
    const now = moment();
    const closed = moment('2022-11-27 00:01');
    const reopen = moment('2022-11-27 09:00');
    const closed2 = moment('2022-11-29 00:01');

    if (now > closed) {
        if (now >= reopen && now < closed2) {
            status = false;
        } else {
            status = true;
        }
    } else {
        status = false;
    }

    return status;
}

export const isRegistAnounced = () => {
    const now = moment();
    const anounced = moment('2022-12-03 21:00');

    if (now > anounced) return true;
    return false;
}

export const isResubmitClosed = () => {
    const now = moment();
    const resubmit = moment('2022-12-01 00:01');
    const resubmitClosed = moment('2022-12-03 00:01');

    if (now >= resubmit && now < resubmitClosed) return false;
    return true;
}

export const registEvent = () => {
    const registClosedEvent = new CustomEvent('registClosed', {
        detail: {
            isClosed: isRegistClosed(),
            isAnounced: isRegistAnounced(),
            isResubmitClosed: isResubmitClosed()
        }
    });

    document.dispatchEvent(registClosedEvent);
    setInterval(() => {
        document.dispatchEvent(registClosedEvent);
    }, 5000);
}

export default {
    isRegistClosed,
    isRegistAnounced,
    isResubmitClosed,
    registEvent
};
