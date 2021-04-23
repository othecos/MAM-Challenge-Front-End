import axios from 'axios';
import DotenvUtils from '@utils/dotenv';


const dotenv =  new DotenvUtils()

const instance = axios.create({
  baseURL: dotenv.getUrl()
});

instance.interceptors.response.use(
  response => {
      return response
  },
  error => {
      if (!error.response) {
          error.response = {
            status: 503,
            message: 'Connection refused'
          }
      }
      return Promise.reject(error)
  }
)
 
export default instance;
