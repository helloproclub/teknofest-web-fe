import moment from 'moment';

export const isRegistClosed = () => {
    let status:
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

export const registEvent = () => {
    const registClosedEvent = new CustomEvent('registClosed', {
        detail: {
            isClosed: isRegistClosed()
        }
    });

    document.dispatchEvent(registClosedEvent);
    setInterval(() => {
        document.dispatchEvent(registClosedEvent);
    }, 5000);
}

export default {
    isRegistClosed
};
