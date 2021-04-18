import * as Yup from 'yup';
 
export const ControlsButtonsSchema = Yup.object().shape({
    license_plate: Yup.string().test('length', 'Can\'t be empty', val => val &&  val.length > 0).required(),
    poi_type: Yup.string().required(),
    radius: Yup.string().required(),
});