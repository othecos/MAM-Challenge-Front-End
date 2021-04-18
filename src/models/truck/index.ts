import Location from './location'


interface TruckLocation {
    current: Location
    history: Array<Location>
}

export default class Truck {


    private _id = ''
    public license_plate: string
    public location: TruckLocation

    /**
     *
     */
    constructor(license_plate = '') {
        this.license_plate = license_plate
        this.location = {
            current: new Location(),
            history: []
        }
    }

    public get id(): string {
        return this._id
    }

    setDataFromDB(truckDB: any): void {
        if (truckDB) {
            if (truckDB._id) this._id = truckDB._id
            if (truckDB.license_plate) this.license_plate = truckDB.license_plate
            if (truckDB.location) {
                this.location.current.setDataFromDB(truckDB.location.current)
                if (truckDB.location.history && Array.isArray(truckDB.location.history)) {
                    this.location.history = truckDB.location.history.map((locationHistory: Location) => {
                        const locationModel = new Location()
                        locationModel.setDataFromDB(locationHistory)
                        return locationModel
                    })
                }
            }
        }
    }


    sortHistoryLocationAsc() {
        if (this.location.history && Array.isArray(this.location.history)) {
            this.location.history.sort((a, b) => a.insertDate.getTime() - b.insertDate.getTime())

        }
    }
    toJSON(): any {
        return {
            license_plate: this.license_plate,
            location: {
                current: this.location.current.toJSON(),
                history: this.location.history.map((location) => location.toJSON())
            }
        }
    }
    toOption(): any {
        return {
            value: this.license_plate,
            label: this.license_plate
        }
    }
}
