export const format = (val: string) => `R$ ` + val;
export const parse = (val: string) => val.replace(/^\$/, "");
