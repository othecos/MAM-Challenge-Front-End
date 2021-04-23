// @ts-nocheck

import { render } from '@tests/jest.setup';
import FormikSelectComponent from '@components/Form/FormikSelect'
import { TFormikSelectProps } from '@interfaces/components/Form/FormikSelect';
import { act, fireEvent, screen, within } from '@testing-library/react';
let fieldMock = {};
let metaMock = {};
let helperMock = {};

jest.mock("formik", () => ({
  ...jest.requireActual("formik"),
  useField: jest.fn(() => {
    return [fieldMock, metaMock, helperMock];
  }),
}));
describe('Select Component', () => {
  let props: TFormikSelectProps;

  beforeEach(() => {
    props = {
      options: [
        { value: 'ft1', label: 'default truck' },
        { value: 'ft2', label: 'Second truck' },
        { value: 'ft3', label: 'Third truck' },
        { value: 'ft4', label: 'Fourth truck' },
      ],
      name: 'select-id',
      label: 'Select POI Type'
    }
  });

  test('Click the select component to display options', async () => {
    const { getByRole } = render(<FormikSelectComponent {...props} />);
    expect(screen.getByText(props.options[0].label)).toBeInTheDocument()
    const select = getByRole('button')
    await act(async () => {
      fireEvent.mouseDown(select)
    })



  })



})