import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptionsArgs} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Configuration} from './app.configuration';
import {System} from "../model/system";

@Injectable()
export class SystemDataService {

    private actionUrl: string;


    constructor(private _http: Http, private _configuration: Configuration) {
        this.actionUrl = _configuration.baseUrl + 'system/';
    }

    public GetAllSystems = (): Observable<System[]> => {
        return this._http.get(this.actionUrl)
            .map((response: Response) => <System[]>response.json())
            .catch(this.handleError);
    }

    public GetSingleSystem = (id: number): Observable<System> => {
        return this._http.get(this.actionUrl + id)
            .map((response: Response) => <System>response.json())
            .catch(this.handleError);
    }

    public AddSystem = (system: System): Observable<System> => {
        let toAdd: string = JSON.stringify(
            {

                id: system.id,
                name: system.name,
                info: system.info,
                localization: system.localization,
                rooms: system.rooms
            });

        let options = this.prepareOptions(null);

        return this._http.post(this.actionUrl, toAdd, options)
            .map((response: Response) => <System>response.json())

            .catch(this.handleError);
    }

    public UpdateSystem = (id: number, systemToUpdate: System): Observable<System> => {
        let options = this.prepareOptions(null);

        return this._http.put(this.actionUrl + id, JSON.stringify(systemToUpdate), options)
            .map((response: Response) => <System>response.json())
            .catch(this.handleError);
    }

    public DeleteSystem = (id: number): Observable<Response> => {
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
