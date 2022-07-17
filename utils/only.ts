export const only = <T>(x: T | T[]) => Array.isArray(x) ? x[0] : x;
export const all = <T>(x: T | T[]) => Array.isArray(x) ? x : [x];
