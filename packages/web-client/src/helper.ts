export const getRemoteText = (url: string) => fetch(url).then((r) => r.text());
