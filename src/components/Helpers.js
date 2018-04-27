export function t(text, arr) {
    arr.forEach((val, key) => {
        text.replace('{{' + key + '}}', val);
    });
    return text;
}