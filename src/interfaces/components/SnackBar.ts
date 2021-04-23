import { SnackbarOrigin } from "@material-ui/core";
import { Color } from "@material-ui/lab/Alert";

export interface ISnackBarProps {
    message: string
    autoHideDuration?: number
    onClose?: any
    anchorOrigin?: SnackbarOrigin
    severity?: Color
}