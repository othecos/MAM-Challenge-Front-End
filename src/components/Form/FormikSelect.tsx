import React from 'react';
import { useField, } from 'formik';
import PropTypes from 'prop-types'
import { FormControl, Select, MenuItem, SelectProps, InputLabel } from '@material-ui/core';

interface Props {
    options: Array<{
        label: string
        value: any
    }>,
    name: string,
    className?: any
}

const FormikSelectComponent = (props: Props & SelectProps) => {
    const [field, meta, helpers] = useField(props as any);
    const { options, className, placeholder,label } = props
    
    return (
        <FormControl variant="outlined" className={className ? className : ''}>
           {label && <InputLabel   id="demo-simple-select-outlined-label">{label}</InputLabel>}
            <Select
                labelId="demo-simple-select-outlined-label"    
                defaultValue={options ? options[0].value : ''}  
                id="demo-simple-select-outlined-label"
                label={label}
                placeholder={placeholder ? placeholder : null}
                onChange={(option) => {
                    helpers.setValue(option.target.value)
                }}

            >
                {options && Array.isArray(options) && options.map((option) =>
                (
                    <MenuItem value={option.value} key={`option_${option.value}`}>
                        {option.label}
                    </MenuItem>
                )
                )}

            </Select>
        </FormControl>

    )
};

export default FormikSelectComponent;