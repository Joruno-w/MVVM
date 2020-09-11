const arrayProto = Array.prototype;
function defArrayFunc(obj,func,namespace,vm) {
    Object.defineProperty(obj,func,{
       enumerable: true,
       configurable: true,
       value(...args){
           let origin = arrayProto[func];
           const result = origin.apply(this,args);
           console.log(getNamespace(namespace,''));
           return result;
       }
    });
}
function proxyArr(vm,arr,namespace) {
    let obj = {
        eleType: 'Array',
        toString(){
            let result = '';
            for (let i = 0;i < arr.length;i++){
                result += arr[i] + ', ';
            }
            return result.substring(0,result.length -2);
        },
        push(){},
        pop() {},
        shift() {},
        unshift() {},
        sort(){},
        reverse(){},
    }
    defArrayFunc.call(vm,obj,'push',namespace,vm);
    defArrayFunc.call(vm,obj,'pop',namespace,vm);
    defArrayFunc.call(vm,obj,'shift',namespace,vm);
    defArrayFunc.call(vm,obj,'unshift',namespace,vm);
    defArrayFunc.call(vm,obj,'sort',namespace,vm);
    defArrayFunc.call(vm,obj,'reverse',namespace,vm);
    Object.setPrototypeOf(arr,obj);
    return arr;
}
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
        proxyObj = new Array(obj.length);
        for (let i = 0;i < obj.length;i ++){
            proxyObj[i] = constructorProxy(vm,obj[i],namespace);
        }
        proxyObj = proxyArr(vm,obj,namespace);
    }else if (obj instanceof Object){
        proxyObj = constructorObjectProxy(vm,obj,namespace);
    }else{
        throw new Error("error");
    }
    return proxyObj;
}
