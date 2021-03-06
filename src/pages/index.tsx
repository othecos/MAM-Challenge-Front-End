
import { useEffect, useState } from 'react'
import GoogleMapsComponent from '@components/GoogleMaps'
import NoSSR from '@components/NoSSR'
import SnackBarComponent  from '@components/SnackBar'
import { ProvideGoogleMapsContext } from '@hooks/useGoogleMaps'
import TrucksService from '@services/trucks' 
import { ISnackBarProps } from '@interfaces/components/SnackBar'

const snackBarInitialData: ISnackBarProps & { isOpen: boolean } = {
  message: '',
  isOpen: false,
  severity: 'error'
}
export default function Home() {
  const [trucks, setTrucks] = useState(null)
  const [mount, setMount] = useState(false)
  const [snackBar, setSnackBar] = useState(snackBarInitialData)
  useEffect(() => {

    const fetchAllTrucks = async () => {
      try {
        const trucksService = new TrucksService()
        const result = await trucksService.findAll()
        if (result && Array.isArray(result) && result.length == 0) setSnackBar({ message: 'No truck found', isOpen: true, severity: 'info' });
        setTrucks(result)
      } catch (err) {
        setSnackBar({ message: 'Error retriveing trucks from server', isOpen: true, })
        console.error('[Error getting trucks]', err);

      }

    }

    if (!mount) {
      fetchAllTrucks()
      setMount(true)
    }

  }, [])

  const handleSnackBarClose = (params: boolean) => {
    setSnackBar((prevValue) => ({
      ...prevValue,
      isOpen: params
    }))
  }
  return (
    <div className="home__container">
      { snackBar.isOpen && <SnackBarComponent message={snackBar.message} onClose={handleSnackBarClose} severity={snackBar.severity}></SnackBarComponent>}
      <NoSSR>
        <ProvideGoogleMapsContext>
          <GoogleMapsComponent trucks={trucks}></GoogleMapsComponent>
        </ProvideGoogleMapsContext>
      </NoSSR>

    </div>
  )
}
