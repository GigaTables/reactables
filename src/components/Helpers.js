export function t(text, arr) {
    for (let k in arr) {
        if (arr.hasOwnProperty(k)) {
            text = text.split('{{' + k + '}}').join(arr[k]);
        }
    }
    return text;
}