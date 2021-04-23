import React from 'react';
import { useField, } from 'formik';
import { TextField, TextFieldProps } from '@material-ui/core';

interface Props {
    name: string
}

const FormikInputComponent = (props: Props & TextFieldProps) => {
    const [field, ,] = useField(props as any);
    const { name } = props
    return ( 
        <TextField  {...field}  {...props}  name={name} />
    )
};

export default FormikInputComponent;