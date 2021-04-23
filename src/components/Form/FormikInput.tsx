import React from 'react';
import { useField, } from 'formik';
import { TextField } from '@material-ui/core';
import { TFormikInputProps } from '@interfaces/components/Form/FormikInput';



const FormikInputComponent = (props: TFormikInputProps) => {
    const [field, ,] = useField(props as any);
    const { name } = props
    return ( 
        <TextField  {...field}  {...props}  name={name} />
    )
};

export default FormikInputComponent;