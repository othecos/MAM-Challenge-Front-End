import { isDate, isNil } from 'lodash'

export default class Location {

    private lat: number | null
    private lng: number | null
    public insertDate: Date | null = null

    /**
     *
     * @param {number} lat
     * @param {number} lng
     */
    constructor(lat = 0, lng = 0) {
        this.lat = lat
        this.lng = lng
    }


    setDataFromDB(location: any): void {
        if (location) {
            if (!isNil(location.lat)) this.lat = location.lat
            if (!isNil(location.lng)) this.lng = location.lng
            if (!isNil(location.insertDate)) {
                if (isDate(location.insertDate)) this.insertDate = location.insertDate
                else {
                    const newDate = new Date(location.insertDate)
                    if (isDate(newDate)) this.insertDate = newDate
                }

            }

        }
    }
    toCoordinates() {
        return {
            lat: this.lat,
            lng: this.lng
        }
    }


    toJSON(): any {
        return {
            lat: this.lat,
            lng: this.lng,
            insertDate: this.insertDate
        }
    }
}
