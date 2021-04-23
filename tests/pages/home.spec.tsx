
import { act, fireEvent } from '@testing-library/react';
import Home from '@pages/index';
import { render } from '@tests/jest.setup';
jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {

  }
}))
describe('Enter Application', () => {


  test('Should have class home__container', async () => {
    const { container } = render(<Home />);
    await act(async () => {
      fireEvent.focus(container.firstChild);
    });

    expect(container.firstChild).toHaveClass('home__container')
  });


})