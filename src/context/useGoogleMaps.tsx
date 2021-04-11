import React, { useState, useEffect, useContext, createContext, useRef } from 'react';

import { KeyPair } from './../models/utils';
export interface ContextProps {

    routeDistance: string,

    activeLicensePlate: string,

    activePoiType: string,

    activeRadius: string,

    routeInfoVisibility: boolean,
    origin: {
        latitude: number,
        longitude: number
    },
    destiny: {
        latitude: number,
        longitude: number
    },
    markers: Array<any>, 
    map: any,
    mapRef: React.MutableRefObject<any>
    mapLoaded: boolean
    originMarker: any,
    destinyMarker: any,

    markerVisibility: boolean,
    isSearchingForPOI: boolean


    setRouteDistance: React.Dispatch<React.SetStateAction<string>>,

    setRouteInfoVisibility: React.Dispatch<React.SetStateAction<boolean>>,
    setMarkerVisibility: React.Dispatch<React.SetStateAction<boolean>>,
    setOrigin: React.Dispatch<React.SetStateAction<{
        latitude: number;
        longitude: number;
    }>>,
    setDestiny: React.Dispatch<React.SetStateAction<{
        latitude: number;
        longitude: number;
    }>>,


    setActiveLicensePlate: React.Dispatch<React.SetStateAction<string>>,
    setActivePoiType: React.Dispatch<React.SetStateAction<string>>,
    setActiveRadius: React.Dispatch<React.SetStateAction<string>>,

    setMarkers: React.Dispatch<React.SetStateAction<any[]>>, 
    setMap: React.Dispatch<React.SetStateAction<any>>,
    setMapLoaded: React.Dispatch<React.SetStateAction<boolean>>,

    setOriginMarker: (value: any) => void
    setDestinyMarker: (value: any) => void,
    setIsSearchingForPOI: (value: any) => void,

    handleMarkerVisibility: (value: any) => void,
    handleRouteVisibility: (value: any) => void,
    clearMarkers: () => void
    clearRoutes: () => void
}

export const GoogleMapsContext = createContext<ContextProps>(null)
export const GoogleMapsContextProvider = GoogleMapsContext.Provider;
export function ProvideGoogleMapsContext({ children }) {
    const context = useProvideGoogleMapContext()
    return < GoogleMapsContextProvider value={context}  > {children} </GoogleMapsContextProvider>
}

const initialCoordinatesValue = {
    latitude: 0,
    longitude: 0
}

let markers = [] 
let destinyMarker = null
let originMarker = null
let isSearchingForPOI = false
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
    const [origin, setOrigin] = useState(initialCoordinatesValue)
    const [destiny, setDestiny] = useState(initialCoordinatesValue)









    const handleMarkerVisibility = (value) => {
        setMarkerVisibility(value)
    }
    const setDestinyMarker = (value) => {
        destinyMarker = value
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
   



    return {
        map,
        mapRef,
        mapLoaded,

        routeDistance,
        routeInfoVisibility,
        origin,
        destiny,


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
        clearMarkers,
        clearRoutes
    }
}


export const useGoogleMapsContext = () => {
    return useContext(GoogleMapsContext);
};