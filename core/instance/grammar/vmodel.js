import {setValue} from "../../utils/objectUtil.js";

export function vmodel(vm,elm,data) {
    elm.onchange = function (event) {
        setValue(vm._data,data,elm.value);
    }
}
