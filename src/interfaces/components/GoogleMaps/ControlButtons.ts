import { IContextProps } from "@interfaces/hooks/useGoogleMaps";
import {   ISelectOptions } from "../Form/FormikSelect";

export interface IControlButtonsProps {
    options: Array<ISelectOptions>
    googleMapsContext: IContextProps
}