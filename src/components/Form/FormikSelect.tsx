import { TFormikSelectProps } from '@interfaces/components/Form/FormikSelect';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { useField } from 'formik';
import React from 'react';



const FormikSelectComponent = (props: TFormikSelectProps) => {
    const [,, helpers] = useField(props as any);
    const { options, className, placeholder,label,id } = props
    
    return (
        <FormControl variant="outlined" className={className ? className : ''}>
           {label && <InputLabel id={id}>{label}</InputLabel>}
            <Select
                labelId={id}    
                defaultValue={options ? options[0].value : ''}  
                id={id}
                label={label}
                data-testid="select-test"
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