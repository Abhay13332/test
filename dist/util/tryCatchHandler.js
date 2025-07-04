export const tryexecuter = (fn) => (...args) => {
    return Promise.resolve(fn(...args)).catch(console.error);
};
export const logtryexecuter = (fn, fnsuccess, fnerr) => (...args) => {
    return Promise.resolve(fn(...args)).then((rtvalue) => {
        fnsuccess ? fnsuccess(rtvalue, ...args) : (() => { console.log(rtvalue); console.log(args); });
        return rtvalue;
    }).catch(fnerr || console.error);
};
