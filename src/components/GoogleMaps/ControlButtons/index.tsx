import { Box, Button, Grid, useMediaQuery } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import { Form, Formik } from 'formik'
import React from 'react'
import { POI_OPTIONS, RADIUS_OPTIONS } from '@config/maps'
import { ContextProps } from '@hooks/useGoogleMaps'
import FormikAutoComplete from '@components/Form/FormikAutoComplete'
import FormikSelect from '@components/Form/FormikSelect'
import { ControlsButtonsSchema } from './schema'

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
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

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
            {({ isValidating, isValid }) =>

                <Form>

                    <Box bgcolor={'white'} className="google-maps__control__container" maxWidth={'100%'}  >
                        <Grid container direction={isMobile ? "column" : "row"} alignItems={'stretch'} spacing={2} className="google-maps__control__form-group" >
                            <Grid container item xs={12} sm={10} direction={isMobile ? "column" : "row"} spacing={2}  >
                                <Grid item xs={12} sm={4} > <FormikAutoComplete options={options} name={'license_plate'} label={'Search by license plate'} variant='outlined' /> </Grid>
                                <Grid item xs={12} sm={4} > <FormikSelect label={'Select POI type'} options={POI_OPTIONS} name={'poi_type'} id="select-poi" className={'google-maps__control__formControl u-full-width'} /></Grid>
                                <Grid item xs={12} sm={4} > <FormikSelect label={'Select radius'} options={RADIUS_OPTIONS} name={'radius'} id="select-radius" className={'google-maps__control__formControl u-full-width'} /> </Grid>
                            </Grid>

                            <Grid container item xs={12} sm={2} spacing={2} >
                                <Grid item xs={12}>
                                    <Button style={{ height: '100%', width: '100%' }} color='primary' variant="contained" type='submit' disabled={isValidating || !isValid}> Apply </Button>
                                </Grid>

                            </Grid>

                        </Grid>
                    </Box>

                </Form>
            }

        </Formik >



    )
}

