import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptionsArgs} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Configuration} from '../shared/app.configuration';
import {Sensor} from "../model/sensor";

@Injectable()
export class SensorDataService {

    private actionUrl: string;


    constructor(private _http: Http, private _configuration: Configuration) {
        this.actionUrl = _configuration.baseUrl + 'sensor/';
    }

    public GetAllSensors = (): Observable<Sensor[]> => {
        return this._http.get(this.actionUrl)
            .map((response: Response) => <Sensor[]>response.json())
            .catch(this.handleError);
    }

    public GetSingleSensor = (id: number): Observable<Sensor> => {
        return this._http.get(this.actionUrl + id)
            .map((response: Response) => <Sensor>response.json())
            .catch(this.handleError);
    }

    public AddSensor = (sensor: Sensor): Observable<Sensor> => {
        let toAdd: string = JSON.stringify(
            {
                id: sensor.id,
                name: sensor.name,
                state: sensor.state,
                value: sensor.value
            });

        let options = this.prepareOptions(null);

        return this._http.post(this.actionUrl, toAdd, options)
            .map((response: Response) => <Sensor>response.json())

            .catch(this.handleError);
    }

    public UpdateSensor = (id: number, sensorToUpdate: Sensor): Observable<Sensor> => {
        let options = this.prepareOptions(null);

        return this._http.put(this.actionUrl + id, JSON.stringify(sensorToUpdate), options)
            .map((response: Response) => <Sensor>response.json())
            .catch(this.handleError);
    }

    public DeleteSensor = (id: number): Observable<Response> => {
        return this._http.delete(this.actionUrl + id)
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }


    private prepareOptions = (options: RequestOptionsArgs): RequestOptionsArgs => {
        options = options || {};

        if (!options.headers) {
            options.headers = new Headers();
        }

        options.headers.append('Content-Type', 'application/json');

        return options;
    }
}
