import { isNil } from "lodash"

export class KeyPair{
    key
    label = ''
    constructor(data){
        if(data){
            if(!isNil(data.key)) this.key = data.key
            if(!isNil(data.label)) this.label = data.label
        }
    }
    setDataFromDB(data){
        if(data){
            if(!isNil(data.key)) this.key = data.key
            if(!isNil(data.label)) this.label = data.label
        }
    }
    toJSON(){
        let obj = {
            key: this.key,
            label: this.label
        }
        return obj
    }
    /**
     * 
     * @param {Array<{key: string, label:string}>} safeObjectArray 
     */
    toSafeJSON(safeObjectArray){
        let obj = {
            key: this.key,
            label: this.label
        }
        try{
            const field = safeObjectArray.find((field)=> field.key == this.key)
            if(!this.label || this.label == '') obj.label = field.label
        }catch(err){
            console.log('Could not parse label')
        }
        return obj
    }
    toUpdate(){
        let obj = {
            key: this.key,
        }
        return obj
    }
    toInit(){
        let obj = {
            key: this.key,
        }
        return obj
    }
    getLabel(){
        return this.label || ''
    }
    getKey(){
        return this.key
    }
} 