import React from 'react';
import { useField, } from 'formik'; 
import {   TextField, TextFieldProps } from '@material-ui/core';

interface Props {
 
    name: string,
 
}

const FormikInputComponent = (props: Props & TextFieldProps) => {
    const [field, meta, helpers] = useField(props as any);
    const { name } = props
    return (
        <React.Fragment  >

            <TextField
                {...field}
                {...props}
                name={name}
            />
                
        
        </React.Fragment>
        
    )
};

export default FormikInputComponent;