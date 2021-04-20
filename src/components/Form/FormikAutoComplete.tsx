

import React from 'react';
import { useField, } from 'formik'; 
import {   TextField, TextFieldProps } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
interface Props {
 
    name: string,
    options: Array<{
        label: string
        value: any
    }>,
}

const FormikAutoCompleteComponent = (props: Props & TextFieldProps) => {
    const [field, meta, helpers] = useField(props as any);
    const { name,options } = props
    return (
        <React.Fragment  >

            <Autocomplete 
                options={options}
                getOptionLabel={(option)=> option.label}
                style={{  maxWidth: '100%'}}
                onInputChange={(event,newInputValue)=>{
                   
                    helpers.setValue(newInputValue)
                }}
                renderInput={(params)=> <TextField {...params}      {...props}  />}
            />
                
        
        </React.Fragment>
        
    )
};

export default FormikAutoCompleteComponent;