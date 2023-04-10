export default function (time: any) {

    const newHour = time.slice(11, 19).split(':');
    const newDay = time.slice(0, 10).split('-');

    if (newHour[1][0] === '0') {
        newHour[1] = newHour[1].slice(1)
    }
    if (newDay[1][0] === '0') {
        newDay[1] = newDay[1].slice(1)
    }
    if (newDay[2][0] === '0') {
        newDay[2] = newDay[2].slice(1)
    }

    const day = Number(newDay[2]);
    let hour = (Number(newHour[0]) + 5);
    const minute = Number(newHour[1]);
    const second = Number(newHour[2])

    const nowDay = new Date().getDate()
    const nowHour = new Date().getHours()
    const nowMinute = new Date().getMinutes()
    const nowSecond = new Date().getSeconds()
    
    if (hour > 24 ) {
        hour = Math.abs(24 - hour)
    }

    if (Math.abs(day - nowDay) >= 1) {
        return String(Math.abs(day - nowDay)) + ' дня назад' || time;
    } else if(Math.abs(hour - nowHour) < 24 && Math.abs(hour - nowHour) >= 1) {
        return String(Math.abs(hour - nowHour)) + ' часов назад' || time;
    } else if (Math.abs(minute - nowMinute) < 60 && Math.abs(minute - nowMinute) >= 1) {
        return String(Math.abs(minute - nowMinute)) + ' минут назад' || time;
    } else {
        return Number(Math.abs(second - nowSecond)) === 0? 'сейчас' : String(Math.abs(second - nowSecond)) + ' секунд назад' || time;
    }
}