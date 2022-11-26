import moment from 'moment';

export const isRegistClosed = () => {
    const now = moment();
    const closed = moment('2022-11-27 00:01');

    if (now > closed) {
        return true;
    }

    return false;
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
