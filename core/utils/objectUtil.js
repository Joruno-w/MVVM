export function getValue(obj,name) {
    if (!obj){
        return obj;
    }
    let temp = obj;
    let nameList = name.split('.');
    for (let i = 0;i < nameList.length;i ++){
        if (temp[nameList[i]]){
            temp = temp[nameList[i]];
        }else{
            return undefined;
        }
    }
    return temp;
}
