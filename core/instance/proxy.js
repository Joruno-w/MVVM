function constructorObjectProxy(vm,obj,namespace) {
    const proxyObj = {};
    for (const prop in obj) {
        Object.defineProperty(proxyObj,prop,{
            configurable: true,
            get() {
                return obj[prop];
            },
            set(newValue) {
                obj[prop] = newValue;
            }
        });
        Object.defineProperty(vm,prop,{
            configurable: true,
            get() {
                return obj[prop];
            },
            set(newValue) {
                obj[prop] = newValue;
            }
        });
    }
    return proxyObj;
}
export function constructorProxy(vm,obj,namespace) { // vm表示Due对象，obj表示要代理的对象，namespace为命名空间
    let proxyObj = null;
    if (Array.isArray(obj)){

    }else if (obj instanceof Object){
        proxyObj = constructorObjectProxy(vm,obj,namespace)
    }else{
        throw new Error("error");
    }
    return proxyObj;
}
