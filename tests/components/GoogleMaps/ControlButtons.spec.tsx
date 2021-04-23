import { render } from '@tests/jest.setup';
import ControlButtonsComponent from '@components/GoogleMaps/ControlButtons'

describe('Control Buttons Component', () => {
  let props;

  beforeEach(() => {
    props = {
      options:  [
        { value: 'ft1', label: 'default truck' },
        { value: 'ft2', label: 'Second truck' },
        { value: 'ft3', label: 'Third truck' },
        { value: 'ft4', label: 'Fourth truck' },
      ],
    };
  });

  test('Should render components', async () => {
    const { getByTestId } = render(<ControlButtonsComponent {...props} />);
    const autocomplete = getByTestId('control-buttons_autocomplete')
    const poi_search = getByTestId('poi_select')
    const radius_search = getByTestId('radius_select')
    const button = getByTestId('control-buttons_button')
   
    expect(autocomplete).toBeVisible()
    expect(poi_search).toBeVisible()
    expect(radius_search).toBeVisible()
    expect(button).toBeDisabled()
  });
 


})