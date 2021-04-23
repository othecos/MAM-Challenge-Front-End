import { TextFieldProps } from "@material-ui/core";

export interface IFormikInput {
    name: string
}
export type TFormikInputProps =  IFormikInput & TextFieldProps