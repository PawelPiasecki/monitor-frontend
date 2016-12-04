import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptionsArgs} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Configuration} from './app.configuration';
import {Room} from "../model/room";

@Injectable()
export class NotificationDataService {

    private actionUrl: string;


    constructor(private _http: Http, private _configuration: Configuration) {
        this.actionUrl = _configuration.baseUrl + 'room/';
    }

    public GetAllRooms = (): Observable<Room[]> => {
        return this._http.get(this.actionUrl)
            .map((response: Response) => <Room[]>response.json())
            .catch(this.handleError);
    }

    public GetSingleRoom = (id: number): Observable<Room> => {
        return this._http.get(this.actionUrl + id)
            .map((response: Response) => <Room>response.json())
            .catch(this.handleError);
    }

    public AddRoom = (room: Room): Observable<Room> => {
        let toAdd: string = JSON.stringify(
            {

                id: room.id,
                name: room.name,
                sensors: room.sensors

            });

        let options = this.prepareOptions(null);

        return this._http.post(this.actionUrl, toAdd, options)
            .map((response: Response) => <Room>response.json())

            .catch(this.handleError);
    }

    public UpdateRoom = (id: number, roomToUpdate: Room): Observable<Room> => {
        let options = this.prepareOptions(null);

        return this._http.put(this.actionUrl + id, JSON.stringify(roomToUpdate), options)
            .map((response: Response) => <Room>response.json())
            .catch(this.handleError);
    }

    public DeleteRoom = (id: number): Observable<Response> => {
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
