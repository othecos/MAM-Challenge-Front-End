

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

const FormikInput = (props: Props & TextFieldProps) => {
    const [field, meta, helpers] = useField(props as any);
    const { name,options } = props
    return (
        <React.Fragment  >

            <Autocomplete 
                options={options}
                getOptionLabel={(option)=> option.label}
                style={{minWidth:'250px'}}
                onInputChange={(event,newInputValue)=>{
                   
                    helpers.setValue(newInputValue)
                }}
                renderInput={(params)=> <TextField {...params}      {...props}  />}
            />
                
        
        </React.Fragment>
        
    )
};

export default FormikInput;