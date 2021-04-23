import SnackBarComponent from '@components/SnackBar';
import { render } from '@tests/jest.setup';

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