import { Snackbar, SnackbarOrigin } from '@material-ui/core';
import MuiAlert, { AlertProps, Color } from '@material-ui/lab/Alert'
import React, { ReactElement } from 'react'

export interface Props {
    message: string
    autoHideDuration?: number
    onClose?: any
    anchorOrigin?: SnackbarOrigin
    severity?: Color
}

const defaultProps: Props = {
    message: '',
    autoHideDuration: 6000,
    severity: 'error',
    anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'center'
    },
    onClose: () => { }
}

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function SnackBarComponent(props: Props = defaultProps): ReactElement {
    const [open, setOpen] = React.useState(true);
    const { message, onClose, autoHideDuration, anchorOrigin, severity } = props

    const handleClose = (_event?: React.SyntheticEvent, reason?: string) => {
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
