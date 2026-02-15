function convertPositions(data) {
    let tmp = data;
    if (!tmp) {
        data = "не указана"
    } else if (tmp.length === 1) {
        data = data[0]
    } else {
        tmp = '';
        for (let i = 0; i < data.length; i++) {
            tmp = tmp + data[i];
            if (data[i + 1]) {
                tmp = tmp + ', ';
            }
        }
        data = tmp
    }
    return data
}

export default convertPositions



