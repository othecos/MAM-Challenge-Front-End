// @ts-nocheck


import Home from '../../src/pages/index'
import { render } from '../jest.setup';
import GoogleMapsComponent from '../../src/components/GoogleMaps'
import { act, fireEvent } from '@testing-library/react';
jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {
    SOME_VARIABLE_HERE: 'whatever-you-want-here'
  }
}))
describe('Enter Application', () => {
  let trucks;

  beforeEach(() => {
    trucks = {
      name: 'New Bar',
      address: '123 Park Dr.',
      deals: [{}],
      imageUrl: 'https://daydrink.io'
    };
  });

  test('Should have class home__container', async () => {
    const { container } = render(<Home />);
    await act(async () => {
      fireEvent.click(container.firstChild);
  });

    expect(container.firstChild).toHaveClass('home__container')
  });
  

})