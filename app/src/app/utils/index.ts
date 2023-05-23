
export const urlProtocolExists = (url: string): boolean => {
    let regex: RegExp = new RegExp('(http)(s)?(\:(\/){2}).+');
    return regex.test(url);
}

export const compareAsc = (a: any, b: any, attr: string) => {
    if (a[attr] < b[attr])
        return 1;
    if (a[attr] > b[attr])
        return -1;
    return 0;
}

export const compareDesc = (a: any, b: any, attr: string) => {
    if (a[attr] < b[attr])
        return 1;
    if (a[attr] > b[attr])
        return -1;
    return 0;
}