// @ts-nocheck

import FormikAutoCompleteComponent from '@components/Form/FormikAutoComplete';
import { IFormikAutoCompleteProps } from '@interfaces/components/Form/FormikAutoComplete';
import { act, fireEvent, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@tests/jest.setup';


let fieldMock = {};
let metaMock = {};
let helperMock = {
  setValue: (_: Value, _?: boolean) => { }
};
jest.mock("formik", () => ({
  ...jest.requireActual("formik"),
  useField: jest.fn(() => {
    return [fieldMock, metaMock, helperMock];
  }),
}));
describe('AutoComplete Component', () => {
  let props: IFormikAutoCompleteProps;

  beforeEach(() => {
    props = {
      options: [
        { value: 'ft1', label: 'default truck' },
        { value: 'ft2', label: 'Second truck' },
        { value: 'ft3', label: 'Third truck' },
        { value: 'ft4', label: 'Fourth truck' },
      ],
      name: 'auto-complete'
    };
  });

  test('Clicking on Autocomplete and checking values', async () => {
    const { getByTitle } = render(<FormikAutoCompleteComponent {...props} />);

    const button = getByTitle('Open')
    userEvent.click(button)
    const presentation = screen.getByRole('presentation')
    for (const option of props.options) {
      expect(presentation).toHaveTextContent(option.label)
    }

  });
  test('Typing on Autocomplete and selecting values', async () => {
    const { getByTestId } = render(<FormikAutoCompleteComponent {...props} />);

    const autocomplete = getByTestId('autocomplete')
    const input = within(autocomplete).getByRole('textbox')
    autocomplete.focus()
    userEvent.type(input, 'Se')
    await act(async () => {
      await fireEvent.keyDown(autocomplete, { key: 'ArrowDown' })
      await fireEvent.keyDown(autocomplete, { key: 'Enter' })
    })


    expect(input.value).toEqual(props.options[1].label)
  });



})