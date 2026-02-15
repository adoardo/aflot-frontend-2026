function convertAFDate(data, short = false) {

    const mon = [
        'января',
        'февраля',
        'марта',
        'апреля',
        'мая',
        'июня',
        'июля',
        'августа',
        'сентября',
        'октября',
        'ноября',
        'декабря',
    ]

    let tdate = data.split('T')[0];
    tdate = tdate.split('-');
    let month = mon[tdate[1] - 1].toUpperCase();
    if (short) {
        month = month.substring(0, 3)
    }
    return parseInt(tdate[2]) + ' ' + month + ' ' + tdate[0]

}

export default convertAFDate