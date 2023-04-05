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
    
    if (Math.abs(Number(newDay[2]) - new Date().getDate()) > 1) {
        return String(Math.abs(Number(newDay[2]) - new Date().getDate())) + ' дня назад' || time;
    } else if(Math.abs(Number(newDay[0]) - new Date().getHours()) < 24 && Math.abs(Number(newDay[0]) - new Date().getHours()) >= 1) {
        return String(Math.abs(Number(newDay[0]) - new Date().getHours())) + ' часов назад' || time;
    } else {
        return String(Math.abs(Number(newDay[1]) - new Date().getMinutes())) + ' минут назад' || time;
    }
}