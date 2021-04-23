import React, { createContext, useContext, useRef, useState } from 'react';

export interface ContextProps {

    routeDistance: string,

    activeLicensePlate: string,

    activePoiType: string,

    activeRadius: string,

    routeInfoVisibility: boolean,
    origin: {
        lat: number,
        lng: number
    },
    destiny: {
        lat: number,
        lng: number
    },

    locations: Array<any>
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
    setOrigin: (value:{
        lat: number;
        lng: number;
    }) => void;
    setDestiny: (value:{
        lat: number;
        lng: number;
    }) => void;


    setActiveLicensePlate: React.Dispatch<React.SetStateAction<string>>,
    setActivePoiType: React.Dispatch<React.SetStateAction<string>>,
    setActiveRadius: React.Dispatch<React.SetStateAction<string>>,

    setLocations: (value: any) => void, 
    setMarkers: (value: any) => void, 
    setMap: React.Dispatch<React.SetStateAction<any>>,
    setMapLoaded: React.Dispatch<React.SetStateAction<boolean>>,

    setOriginMarker: (value: any) => void
    setDestinyMarker: (value: any) => void,
    setIsSearchingForPOI: (value: any) => void,

    handleMarkerVisibility: (value: any) => void,
    handleRouteVisibility: (value: any) => void,
    clearMarkers: () => void
    clearRoutes: () => void
    clearLocations: () => void
}

export const GoogleMapsContext = createContext<ContextProps>(null)
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