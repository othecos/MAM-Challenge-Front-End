

import React from 'react';
import { useField, } from 'formik';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TFormikAutoCompleteProps } from '@interfaces/components/Form/FormikAutoComplete';

const FormikAutoCompleteComponent = (props: TFormikAutoCompleteProps ) => {
    const [field, meta, helpers] = useField(props as any);
    const { options } = props
    return (
        <React.Fragment  >

            <Autocomplete
                options={options}
                data-testid="autocomplete"
                getOptionLabel={(option) => option.label}
                style={{ maxWidth: '100%' }}
                onInputChange={(event, newInputValue) => {  helpers.setValue(newInputValue) }}
                renderInput={(params) => <TextField {...params}      {...props} />}
            />


        </React.Fragment>

    )
};

export default FormikAutoCompleteComponent;