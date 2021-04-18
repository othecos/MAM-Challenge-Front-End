import { Snackbar, SnackbarOrigin } from '@material-ui/core';
import MuiAlert, { AlertProps, Color } from '@material-ui/lab/Alert'
import React, { ReactElement } from 'react'

export interface SnackBarComponentProps {
    message: string
    autoHideDuration?: number
    onClose?: any
    anchorOrigin?: SnackbarOrigin
    severity?: Color
}
function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SnackBarComponent({ message, autoHideDuration = 6000,severity = 'error', anchorOrigin = { vertical: 'bottom', horizontal: 'center' }, onClose = () => { } }: SnackBarComponentProps): ReactElement {
    const [open, setOpen] = React.useState(true);


    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
     
        setOpen(false);
        onClose(false)
    };

    return (
        <div>
            <Snackbar open={open} autoHideDuration={autoHideDuration} onClose={handleClose} anchorOrigin={anchorOrigin}>
                <Alert onClose={handleClose} severity={severity}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    )
}
