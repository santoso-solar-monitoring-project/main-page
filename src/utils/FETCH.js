export const FETCH = async (url, ...args) => (await fetch(url, ...args)).json();
