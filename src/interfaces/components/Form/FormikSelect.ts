import { SelectProps } from "@material-ui/core";

export interface IFormikSelect {
    options: Array<ISelectOptions>,
    id: string
    name: string,
    className?: any
}
export interface ISelectOptions {
    label: string
    value: any
}
export type TFormikSelectProps = IFormikSelect & SelectProps