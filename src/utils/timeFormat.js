import * as dayjs from 'dayjs';

export function convetTimeFormat(time) {
    return dayjs(time).format('YYYY/MM/DD HH:mm:ss');
}