// @ts-nocheck
 
import { render } from './../../jest.setup';
import SnackBarComponent from '../../../src/components/SnackBar'

describe('Snack Bar Component', () => {
  let props;

  beforeEach(() => {
    props = {
      message: 'That was an error',
    };
  });

  test('Should display correct message', async () => {
    const { getByText } = render(<SnackBarComponent {...props} />);
    const message = getByText(props.message)
    expect(message).toBeVisible()
  });
 


})