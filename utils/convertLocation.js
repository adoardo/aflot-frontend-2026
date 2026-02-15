function convertLocation(data) {
    if (data.country || data.region || data.city) {
        return [data.country, data.region, data.city].join(', ')
    } else {
        return 'не указано'
    }

}

export default convertLocation



