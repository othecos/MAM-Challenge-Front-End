
import { useEffect, useState } from 'react'
import GoogleMapsComponent from '../components/GoogleMaps'
import NoSSR from '../components/NoSSR'
import { ProvideGoogleMapsContext } from '../context/useGoogleMaps'
import TrucksService from '../services/trucks'
import styles from '../styles/Home.module.scss'

 
export default function Home() {
  const [trucks,setTrucks]= useState(null)
  const [mount,setMount]= useState(false)
  useEffect(() => {

    const fetchAllTrucks = async () =>{
      try{
        const trucksService = new TrucksService()
        const result = await trucksService.findAll()
         
        setTrucks(result)
      }catch(err){
        console.error('[Error getting trucks]', err);
        
      }
    
    }
    if(!mount){
      fetchAllTrucks()
      setMount(true)
    }

  }, [])
  return (
    <div className={styles.container}>
      <NoSSR>
        <ProvideGoogleMapsContext>
          <GoogleMapsComponent trucks={trucks}></GoogleMapsComponent>
        </ProvideGoogleMapsContext>
      </NoSSR>

    </div>
  )
}
