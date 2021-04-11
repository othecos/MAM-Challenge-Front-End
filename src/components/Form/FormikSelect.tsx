import React from 'react';
import { useField, } from 'formik';
import PropTypes from 'prop-types'
import { FormControl, Select, MenuItem, SelectProps } from '@material-ui/core';

interface Props {
    options: Array<{
        label: string
        value: any
    }>,
    name: string,
    styles: any
}

const FormikSelect = (props: Props & SelectProps) => {
    const [field, meta, helpers] = useField(props as any);
    const { options, styles, placeholder } = props
    
    return (
        <FormControl variant="outlined" className={styles.formControl}>

            <Select
                defaultValue={options ? options[0].value : ''}
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

export default FormikSelect;