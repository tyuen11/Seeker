
export const urlProtocolExists = (url: string): boolean => {
    let regex: RegExp = new RegExp('(http)(s)?(\:(\/){2}).+');
    return regex.test(url);
}