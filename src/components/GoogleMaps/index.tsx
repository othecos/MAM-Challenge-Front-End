import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import styles from './../../styles/GoogleMaps.module.scss'

import { Loader } from '@googlemaps/js-api-loader';
import DotenvUtils from '../../utils/dotenv';
import { useGoogleMapsContext } from '../../context/useGoogleMaps';
import ControlButtons from './ControlButtons';
import Truck from '../../models/truck';
import { isEmpty } from 'lodash';
import { MAP_ICONS } from '../../config/maps';
interface Props {
    trucks: Array<Truck>
}
let google: any = {}
let infowindow, directionsRenderer, directionsService, placesService

function GoogleMapsComponent(props: Props) {
    const context = useGoogleMapsContext()
    const [mount, setMount] = useState(false)

    console.log(context, props)
    useEffect(() => {
        if (!mount) {
            const loader = new Loader({
                apiKey: new DotenvUtils().getApiKey(),
                version: 'weekly',
                libraries:['places','geometry']
            });
            loader.load().then(() => {
                google = window.google
                const geometry = new google.maps.LatLng(38.722252, -9.139337);
                const map = new google.maps.Map(context.mapRef.current, {
                    center: geometry,
                    zoom: 15,
                    zoomControl: true,
                    zoomControlOptions: {
                        position: google.maps.ControlPosition.LEFT_BOTTOM,
                    },
                    rotateControl: true,
                    mapTypeControl: false,
                    scaleControl: true,
                    streetViewControl: false,
                    fullscreenControl: false,
                });
                infowindow = new google.maps.InfoWindow();
                directionsRenderer = new google.maps.DirectionsRenderer({ suppressMarkers: true });
                directionsService = new google.maps.DirectionsService();
                placesService = new google.maps.places.PlacesService(map)
                map.panTo(geometry)
                context.setMap(map)
                context.setOrigin({
                    longitude: -9.139337,
                    latitude: 38.722252
                })
                context.setOriginMarker(createMarker(geometry, map,'/assets/icn-current-location.png'))
                context.setMapLoaded(true)


            });
            setMount(true)
        }


    }, []);

    async function searchAndRenderPOI(keyword, radius?) {
        
        const geometry = new window.google.maps.LatLng(context.origin.latitude, context.origin.longitude);
   
        if (geometry && keyword && !context.isSearchingForPOI) {
            context.clearMarkers()
            if (!placesService) { placesService = new window.google.maps.places.PlacesService(context.map) }
            context.setIsSearchingForPOI(true)
            const parameters = {
                location: geometry,
                keyword: keyword,
                fields: ['ALL']
            }
            if (!isEmpty(radius)) parameters['radius'] = radius
            placesService?.nearbySearch(parameters, (values, status) => {
               
                setMarkersFromSearch(values, status)
                context.setIsSearchingForPOI(false)
            });
        }


    }
    // function calculateAndDisplayRoute(origin, destination, travelMode) {

    //     if (!directionsService) directionsService = new google.maps.DirectionsService();

    //     directionsService.route(
    //         {
    //             origin,
    //             destination,
    //             travelMode: google.maps.TravelMode[travelMode],
    //         },
    //         (response, status) => {
    //             if (status == "OK") {
    //                 context.handleRouteChange(response)
    //                 if (context.destinyMarker) {
    //                     context.destinyMarker.setMap(null)
    //                 }
    //                 context.setDestinyMarker(createMarker(destination, null, false, listingDetailsContext.map))


    //                 directionsRenderer?.setDirections(response);
    //             }
    //         }
    //     );

    // }

    function setMarkersFromSearch(values, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
       
            const markers = []
            for (var i = 0; i < values.length; i++) {
                const location = values[i].geometry.location
                const name = values[i].name
                const types = values[i].types
                if (location) {
                      
                    const type = types.find((type)=> MAP_ICONS[type]) 
                    const marker = createMarker(location, context.map,MAP_ICONS[type]);

                    if (marker) {
                        markers.push(marker)

                        context.setMarkers(markers)
                        google.maps.event.addListener(marker, 'click', function () {
                            if (!infowindow) infowindow = new google.maps.InfoWindow();
                            infowindow.setContent(name);
                            infowindow.open(context.map, this);
                        });
                    }


                }
            }



            return
        }
    }


    function createButtons(component, map, id = 'map_buttons', position = google.maps.ControlPosition.RIGHT_TOP) {

        if (component && map) {
            map.controls[position].clear()
            let element = document.getElementById(id)
            
            if (!element) {
                element = document.createElement('div')
                element.style.maxWidth = '100%'
                element.id = id
            }  
            map.controls[position].push(element);
            ReactDOM.render(component, element)
        }
    }
    function createMarker(geometry, map, icon) {
        if (geometry && map) {
            if (geometry) {
                const markerOption = {
                    map,
                    animation: google.maps.Animation.DROP,
                    position: geometry,
                    
                }
                if(icon){ markerOption['icon'] = {
                    url: icon,
                    scaledSize: new window.google.maps.Size(50,50)
                }}
                const marker = new google.maps.Marker(markerOption );
                return marker
            }
        } else {
            return null
        }
    }
    useEffect(() => {
        if (context.mapLoaded) {
            const options = props.trucks ? props.trucks.map((truck) => truck.toOption()) : []
            console.log(props.trucks, context.mapLoaded)
            createButtons(<ControlButtons googleMapsContext={context} options={options}></ControlButtons>, context.map, 'map_buttons', window.google.maps.ControlPosition.LEFT_TOP)
        }

    }, [props.trucks, context.mapLoaded])

    useEffect(() => {
         
        if (!isEmpty(context.activePoiType) && !isEmpty(context.activeRadius)) {
            context.clearMarkers()
            searchAndRenderPOI(context.activePoiType,context.activeRadius)
        }
    }, [context.activePoiType,context.activeRadius])
    useEffect(() => {
       if(props.trucks){
        const selectedTruck = props.trucks.find((truck)=> truck.license_plate === context.activeLicensePlate)
       
       }
      
    }, [context.activeLicensePlate])

    return (
        <div id="map" className={styles.mapFull} ref={context.mapRef}></div>
    )
}

export default GoogleMapsComponent
