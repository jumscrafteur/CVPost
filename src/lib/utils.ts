export const encodeBase64URLData = (data: object) => {
    const textData = JSON.stringify(data)
    // eslint-disable-next-line no-control-regex
    const UnicodeFreeText = textData.replace(/[^\x00-\xFF]/g, "");
    const b64Data = btoa(UnicodeFreeText)
    const URLFriendlyb64 = b64Data
        .replaceAll('+', '.')
        .replaceAll('/', '_')
        .replaceAll('=', '-')

    return URLFriendlyb64;
};

export const decodeBase64URLData = (URLFriendlyb64: string) => {
    const b64Data = URLFriendlyb64
        .replaceAll('.', '+')
        .replaceAll('_', '/')
        .replaceAll('-', '=')

    const UnicodeFreeText = atob(b64Data)

    return JSON.parse(UnicodeFreeText)
};