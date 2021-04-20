import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/server' 

import { Loader } from '@googlemaps/js-api-loader';
import DotenvUtils from '../../utils/dotenv';
import { useGoogleMapsContext } from '../../context/useGoogleMaps';
import ControlButtons from './ControlButtons';
import Truck from '../../models/truck';
import { isEmpty } from 'lodash';
import { LISBON_COORDINATES, MAP_ICONS, MAPS_STYLES } from '../../config/maps';
import DistanceInfoWindow from './InfoWindow/DistanceInfoWindow';
interface Props {
    trucks: Array<Truck>
}
interface LatLng {
    lat: number
    lng: number
}

let google: any = {}
let infowindow, distanceInfoWindow, directionsRenderer, directionsService, placesService

function GoogleMapsComponent(props: Props) {
    const context = useGoogleMapsContext()
    const [mount, setMount] = useState(false)

    useEffect(() => {
        if (!mount) {
            const loader = new Loader({
                apiKey: new DotenvUtils().getApiKey(),
                version: 'weekly',
                libraries: ['places', 'geometry']
            });
            loader.load().then(() => {
                google = (window as any).google
                const geometry = createLatLng(LISBON_COORDINATES)
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
                    styles: MAPS_STYLES
                });
                infowindow = new google.maps.InfoWindow();
                distanceInfoWindow = new google.maps.InfoWindow();
                directionsRenderer = new google.maps.DirectionsRenderer({ suppressMarkers: true });
                directionsService = new google.maps.DirectionsService();
                placesService = new google.maps.places.PlacesService(map)
                map.panTo(geometry)
                context.setMap(map)

                context.setMapLoaded(true)


            });
            setMount(true)
        }


    }, []);

    async function searchAndRenderPOI(coordinates: LatLng, keyword, radius?) {

        const geometry = createLatLng(coordinates)

        if (geometry && keyword && !context.isSearchingForPOI) {
            context.clearMarkers()
            if (!placesService) { placesService = new (window as any).google.maps.places.PlacesService(context.map) }
            context.setIsSearchingForPOI(true)
            const parameters = {
                location: geometry,
                keyword: keyword,
                fields: ['ALL']
            }
            if (!isEmpty(radius)) parameters['radius'] = radius

            placesService?.nearbySearch(parameters, (values, status) => {

                setMarkersFromSearch(values, status, coordinates)
                context.setIsSearchingForPOI(false)
            });
        }


    }
    //Routes
    function calculateAndDisplayRoute(origin, destination, shouldDisplayDistance = false, travelMode = 'DRIVING') {
        if (!directionsService) directionsService = new google.maps.DirectionsService();

        directionsService.route(
            {
                origin,
                destination,
                travelMode: google.maps.TravelMode[travelMode],
            },
            (response, status) => {
                if (status == "OK") {
                    if (shouldDisplayDistance) {
                        const distance = getDistanceFromDirectionsResult(response)
                        if (distance) {
                            const elementString = ReactDOMServer.renderToString(<DistanceInfoWindow distance={distance.text} />)
                            distanceInfoWindow = new google.maps.InfoWindow({
                                content: elementString,
                                position: origin,
                                pixelOffset: new (window as any).google.maps.Size(0, -35)
                            });

                            distanceInfoWindow.open(context.map);
                        }
                    }

                    directionsRenderer?.setDirections(response);
                }
            }
        );

    }
    function getDistanceFromDirectionsResult(result) {
        if (result) {
            return result?.routes[0]?.legs[0]?.distance
        }
        return null

    }
    function addRoute(origin, destination, map, shouldDisplayDistance = false) {
        if (origin && destination) {
            if (!directionsRenderer) directionsRenderer = new google.maps.DirectionsRenderer({ suppressMarkers: true });
            directionsRenderer.setMap(map);

            calculateAndDisplayRoute(origin, destination, shouldDisplayDistance);
        }


    }
    function removeRoute() {
        if (!directionsRenderer) directionsRenderer = new google.maps.DirectionsRenderer({ suppressMarkers: true });

        if (distanceInfoWindow) distanceInfoWindow.close();
        directionsRenderer.setMap(null)
    }
    //Markers

    function setMarkersFromSearch(values, status, originLocation) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {

            const markers = []
            for (var i = 0; i < values.length; i++) {
                const location = values[i].geometry.location
                const name = values[i].name
                const types = values[i].types
                if (location) {

                    const type = types.find((type) => MAP_ICONS[type])
                    const marker = createMarker(location, context.map, MAP_ICONS[type]);

                    if (marker) {
                        markers.push(marker)

                        context.setMarkers(markers)
                        google.maps.event.addListener(marker, 'click', function () {
                            if (!infowindow) infowindow = new google.maps.InfoWindow();
                            infowindow.setContent(name);
                            infowindow.open(context.map, this);

                            removeRoute()
                            const origin = createLatLng(originLocation)
                            addRoute(origin, location, context.map, true)
                        });
                    }


                }
            }



            return
        }
    }
    function setLatestPositions(truck: Truck, map) {
        if (truck && truck.location.history && truck.location.history.length > 0) {

            context.clearLocations();
            const history = truck.location.history;
            truck.sortHistoryLocationAsc();
            const locationMarkers = []
            for (let index = 0; index < history.length; index++) {
                const location = history[index];
                const geometry = createLatLng(location.toCoordinates())
                let icon = index === 0 ? '/assets/icn-first-location.png' : '/assets/icn-path.png'
                const locationMarker = createMarker(geometry, map, icon, { height: 15, width: 15 })
                if (locationMarker) {
                    locationMarkers.push(locationMarker)
                    context.setLocations(locationMarkers)
                }


            }

        }

    }

    function getSelectedTruck(license_plate) {
        if (props.trucks && Array.isArray(props.trucks)) {
            return props.trucks.find((truck) => truck.license_plate === license_plate)
        }
        return null
    }
    function handleTruckChange(truck: Truck, map) {
        const coordinates = truck.location.current.toCoordinates()
        const geometry = createLatLng(coordinates)
        if (geometry) {
            removeRoute()
            if (context.originMarker) context.originMarker.setMap(null)
            context.setOrigin(coordinates)

            if (context.activePoiType, context.activeRadius) {
                searchAndRenderPOI(coordinates, context.activePoiType, context.activeRadius)
            }

            context.setOriginMarker(createMarker(geometry, map, '/assets/icn-current-location.png'))
            context.map.panTo(geometry)
        }

    }
    function createLatLng(coordinates: LatLng) {
        if (!google) google = (window as any).google

        return new google.maps.LatLng(coordinates);
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
    function createMarker(geometry, map, icon = '/assets/icn-common.png', markerSize = { height: 35, width: 35 }) {
        if (geometry && map) {
            if (geometry) {
                const markerOption = {
                    map,
                    animation: google.maps.Animation.DROP,
                    position: geometry,

                }
                if (icon) {
                    markerOption['icon'] = {
                        url: icon,
                        scaledSize: new (window as any).google.maps.Size(markerSize.width, markerSize.height)
                    }
                }
                const marker = new google.maps.Marker(markerOption);
                return marker
            }
        } else {
            return null
        }
    }
    useEffect(() => {
        if (context.mapLoaded) {
            const options = props.trucks ? props.trucks.map((truck) => truck.toOption()) : []
            createButtons(<ControlButtons googleMapsContext={context} options={options}></ControlButtons>, context.map, 'map_buttons', (window as any).google.maps.ControlPosition.LEFT_TOP)
        }

    }, [props.trucks, context.mapLoaded])

    useEffect(() => {

        if (!isEmpty(context.activePoiType) && !isEmpty(context.activeRadius) && !isEmpty(context.activeLicensePlate)) {
            const selectedTruck = getSelectedTruck(context.activeLicensePlate)
            if (selectedTruck) {
                const coordinates = selectedTruck.location.current.toCoordinates()
                context.clearMarkers()
                if (infowindow) infowindow.close();
                removeRoute()
                searchAndRenderPOI(coordinates, context.activePoiType, context.activeRadius)
            }

        }
    }, [context.activePoiType, context.activeRadius])
    useEffect(() => {
        if (props.trucks) {
            const selectedTruck = getSelectedTruck(context.activeLicensePlate)
            if (selectedTruck && context.map) {
                handleTruckChange(selectedTruck, context.map)
                setLatestPositions(selectedTruck, context.map)
            }

        }

    }, [context.activeLicensePlate])

    return (
        <div id="map" className="google-maps__container" ref={context.mapRef}></div>
    )
}

export default GoogleMapsComponent
