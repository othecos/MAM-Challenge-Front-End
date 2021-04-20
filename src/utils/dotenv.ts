import getConfig from 'next/config'

// Only holds serverRuntimeConfig and publicRuntimeConfig
const { publicRuntimeConfig } = getConfig()
const { NEXT_PUBLIC_HOST, NEXT_PUBLIC_VERSION, NODE_ENV, NEXT_PUBLIC_API_KEY } = publicRuntimeConfig
export default class DotenvUtils {

    getUrl() {
        let url = `${NEXT_PUBLIC_HOST}/${NEXT_PUBLIC_VERSION}`
        
        return url
    }
    getEnv(){
        return NODE_ENV
    }
    isDev(){
        return NODE_ENV == 'development'
    }
    getApiKey(){
        return NEXT_PUBLIC_API_KEY
    }
    getAllEnv(){
        return publicRuntimeConfig
    }
   
}
