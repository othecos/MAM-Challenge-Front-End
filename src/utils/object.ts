import { isObject } from 'lodash'
export const cloneObject = (obj) =>{
    try {
        return JSON.parse(JSON.stringify(obj))
    } catch (error) {
        return obj
    }
}
export const clone = (value) =>{
    if(isObject(value) ){
        return cloneObject(value)
    }else if(Array.isArray(value)){
        return [...value]
    }else{
        return value
    }
}