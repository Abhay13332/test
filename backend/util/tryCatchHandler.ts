

export const tryexecuter =<T extends (...args:any)=>Promise<any>>(fn:T)=>(...args:Parameters<T>):ReturnType<T> => {
   return Promise.resolve(fn(...args)).catch(console.error) as ReturnType<T>;
}
export const logtryexecuter=<T extends (...args:any)=>Promise<any>>(fn:T,fnsuccess?:(rtvalue:ReturnType<T> extends Promise<infer U>?U:never,...args:any)=>void,fnerr?:(err?:any)=>void)=>(...args:Parameters<T>):ReturnType<T> => {
    return Promise.resolve(fn(...args)).then((rtvalue:ReturnType<T> extends Promise<infer U>?U:never)=>{
       fnsuccess? fnsuccess(rtvalue,...args) : (()=>{console.log(rtvalue)  ;console.log(args)});

        return rtvalue;
    }).catch(fnerr || console.error) as ReturnType<T>;
}