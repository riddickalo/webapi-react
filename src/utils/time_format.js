import * as dayjs from 'dayjs';

export function convertTimeFormat(time) {
    return (time !== null)? dayjs(time).format('YYYY/MM/DD HH:mm:ss'): null;
}