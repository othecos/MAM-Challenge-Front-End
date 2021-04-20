import { Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@material-ui/core'
import { Form, Formik } from 'formik'
import React from 'react'
import { POI_OPTIONS, RADIUS_OPTIONS } from '../../../config/maps'
import FormikSelect from '../../Form/FormikSelect'
import FormikAutoComplete from '../../Form/FormikAutoComplete'
import styles from './controlButtons.module.scss'
import { ContextProps } from '../../../context/useGoogleMaps'
import { ControlsButtonsSchema } from './ControlButtons.schema'

interface Props {
    options
    googleMapsContext: ContextProps
}
const initialValues = {
    license_plate: '',
    poi_type: '(gas_station) OR (food) OR (hotels)',
    radius: '1000'
}
export default function ControlButtonsComponent(props: Props) {
    const handleSubmit = (value) => {

        const { license_plate, poi_type, radius } = value
        if (props.googleMapsContext) {
            props.googleMapsContext.setActiveLicensePlate(license_plate)
            props.googleMapsContext.setActivePoiType(poi_type)
            props.googleMapsContext.setActiveRadius(radius)
        }
         
    }
    const { options } = props

    return (

        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={ControlsButtonsSchema}
            validateOnMount={true}
        >
            {({ isValidating,isValid }) =>
                
                <Form>
                    
                    <Box bgcolor={'white'} className={styles.container} maxWidth={'100%'} padding={'1rem'}>
                        <Grid container direction="row" spacing={2} alignItems={'stretch'} >
                            <Grid item > <FormikAutoComplete options={options} name={'license_plate'} label={'Search by license plate'} variant='outlined' /> </Grid>
                            <Grid item > <FormikSelect label={'Select POI type'} options={POI_OPTIONS} name={'poi_type'} styles={styles} /></Grid>
                            <Grid item >   <FormikSelect label={'Select radius'} options={RADIUS_OPTIONS} name={'radius'} styles={styles} /> </Grid>
                            <Grid item > 
                                <Button style={{ height: '100%' }} color='primary' variant="contained" type='submit' disabled={  isValidating || !isValid}> Apply </Button> 
                            </Grid>

                        </Grid>
                    </Box>

                </Form>
            }

        </Formik >



    )
}
 
