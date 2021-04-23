import Home from '@pages/index';
import { render } from '@tests/jest.setup';
jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {
    SOME_VARIABLE_HERE: 'whatever-you-want-here'
  }
}))
describe('Enter Application', () => {
   

  test('Should have class home__container', async () => {
    const { container } = render(<Home />);
    
    expect(container.firstChild).toHaveClass('home__container')
  });
  

})