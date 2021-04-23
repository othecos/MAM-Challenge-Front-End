import { IContextProps } from '@interfaces/hooks/useGoogleMaps';
import React, { createContext, useContext, useRef, useState } from 'react';


export const GoogleMapsContext = createContext<IContextProps>(null)
export const GoogleMapsContextProvider = GoogleMapsContext.Provider;
export function ProvideGoogleMapsContext({ children }) {
    const context = useProvideGoogleMapContext()
    return < GoogleMapsContextProvider value={context}  > {children} </GoogleMapsContextProvider>
}

const initialCoordinatesValue = {
    lat: 0,
    lng: 0
}

let markers = [] 
let destinyMarker = null
let originMarker = null
let isSearchingForPOI = false

let locations = []

let origin = initialCoordinatesValue
let destiny = initialCoordinatesValue
function useProvideGoogleMapContext() {
    //Map Variables
    const mapRef = useRef()
    const [map, setMap] = useState(null)
    const [mapLoaded, setMapLoaded] = useState(false)
    //Markers
    const [activeLicensePlate, setActiveLicensePlate] = useState(null)
    const [activePoiType, setActivePoiType] = useState(null)
    const [activeRadius, setActiveRadius] = useState(null)
    const [markerVisibility, setMarkerVisibility] = useState(true)
    
    //Route
    const [routeDistance, setRouteDistance] = useState('')
    const [routeInfoVisibility, setRouteInfoVisibility] = useState(false) 









    const handleMarkerVisibility = (value) => {
        setMarkerVisibility(value)
    }
    const setDestinyMarker = (value) => {
        destinyMarker = value
    }
    const setOrigin = (value) => {
        origin = value
    }
    const setDestiny = (value) => {
        destiny = value
    }
    const setOriginMarker = (value) => {
        originMarker = value
    }
    const setIsSearchingForPOI = (value) => {
        isSearchingForPOI = value
    }
    const handleRouteVisibility = (value) => {
        setRouteInfoVisibility(value)
    }

    const clearMarkers = () => {

        if (markers && markers.length > 0) {
            for (let index = 0; index < markers.length; index++) {

                const marker = markers[index];

                if (marker) marker.setMap(null)

            }

            markers = []
        }

      

    }
    const clearLocations = () => { 
        if (locations && locations.length > 0) {
            for (let index = 0; index < locations.length; index++) { 
                const location = locations[index]; 
                if (location) location.setMap(null) 
            }
            locations = [] 
        } 
    }
    const clearRoutes = () => { 
        setRouteDistance(null)
        setRouteInfoVisibility(false)
        if (destinyMarker) {
            destinyMarker.setMap(null) 
        }
    }
    const setMarkers = (value) => {
        markers = value
    }
    const setLocations = (value) => {
        locations = value
    }
    
    return {
        map,
        mapRef,
        mapLoaded,

        routeDistance,
        routeInfoVisibility,
        origin,
        destiny,


        locations,

        activeLicensePlate,
        activePoiType,
        activeRadius,
        markers, 
        isSearchingForPOI,
        originMarker,
        destinyMarker,
        markerVisibility,


        setMap,
        setMapLoaded,

        setRouteDistance,
        setRouteInfoVisibility,
        setOrigin,
        setDestiny,

        setLocations,

        setActiveLicensePlate,
        setActivePoiType,
        setActiveRadius,
        setMarkers, 

        setIsSearchingForPOI,

        setOriginMarker,
        setDestinyMarker,
        setMarkerVisibility,


        handleMarkerVisibility,
        handleRouteVisibility,
        clearLocations,
        clearMarkers,
        clearRoutes
    }
}


export const useGoogleMapsContext = () => {
    return useContext(GoogleMapsContext);
};