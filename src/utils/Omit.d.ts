// https://stackoverflow.com/a/48216010/3624264
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
