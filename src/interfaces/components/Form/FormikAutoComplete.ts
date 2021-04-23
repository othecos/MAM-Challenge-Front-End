import { TextFieldProps } from "@material-ui/core";
import { ISelectOptions } from "./FormikSelect";

export interface IFormikAutoComplete  {
    name: string,
    options: Array<ISelectOptions>
}
export type TFormikAutoCompleteProps = IFormikAutoComplete & TextFieldProps