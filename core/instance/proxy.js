function constructorObjectProxy(vm,obj,namespace) {
    const proxyObj = {};
    for (const prop in obj) {
        Object.defineProperty(proxyObj,prop,{
            configurable: true,
            get() {
                return obj[prop];
            },
            set(newValue) {
                console.log(getNamespace(namespace,prop));
                obj[prop] = newValue;
            }
        });
        Object.defineProperty(vm,prop,{
            configurable: true,
            get() {
                return obj[prop];
            },
            set(newValue) {
                console.log(getNamespace(namespace,prop));
                obj[prop] = newValue;
            }
        });
        if (obj[prop] instanceof Object){
            proxyObj[prop] = constructorProxy(vm,obj[prop],getNamespace(namespace,prop));
        }
    }
    return proxyObj;
}
function getNamespace(namespace,prop) {
    if (namespace == null || namespace == ''){
        return prop;
    }else if (prop == null || prop == ''){
        return namespace;
    }else{
        return namespace + '.' + prop;
    }
}
export function constructorProxy(vm,obj,namespace) { // vm表示Due对象，obj表示要代理的对象，namespace为命名空间
    let proxyObj = null;
    if (Array.isArray(obj)){

    }else if (obj instanceof Object){
        proxyObj = constructorObjectProxy(vm,obj,namespace);
    }else{
        throw new Error("error");
    }
    return proxyObj;
}
