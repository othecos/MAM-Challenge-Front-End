// @ts-nocheck
 
import { render } from '@tests/jest.setup';
import DistanceInfoWindow from '@components/GoogleMaps/InfoWindow'

describe('Infowindow Component', () => {
  let props;

  beforeEach(() => {
    props = {
      distance: '100km',
    };
  });

  test('Should display correct message', async () => {
    const { getByText } = render(<DistanceInfoWindow {...props} />);
    const message = getByText(`Distance: ${props.distance}`)
    expect(message).toBeVisible()
  });
 


})