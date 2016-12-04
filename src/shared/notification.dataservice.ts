import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptionsArgs} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Configuration} from './app.configuration';
import {Notification} from "../model/notification";

@Injectable()
export class NotificationDataService {

    private actionUrl: string;


    constructor(private _http: Http, private _configuration: Configuration) {
        this.actionUrl = _configuration.baseUrl + 'notification/';
    }

    public GetAllNotifications = (): Observable<Notification[]> => {
        return this._http.get(this.actionUrl)
            .map((response: Response) => <Notification[]>response.json())
            .catch(this.handleError);
    }

    public GetSingleNotification = (id: number): Observable<Notification> => {
        return this._http.get(this.actionUrl + id)
            .map((response: Response) => <Notification>response.json())
            .catch(this.handleError);
    }

    public AddNotification = (notification: Notification): Observable<Notification> => {
        let toAdd: string = JSON.stringify(
            {

                id: notification.id,
                message: notification.message

            });

        let options = this.prepareOptions(null);

        return this._http.post(this.actionUrl, toAdd, options)
            .map((response: Response) => <Notification>response.json())

            .catch(this.handleError);
    }

    public UpdateNotification = (id: number, systemToUpdate: Notification): Observable<Notification> => {
        let options = this.prepareOptions(null);

        return this._http.put(this.actionUrl + id, JSON.stringify(systemToUpdate), options)
            .map((response: Response) => <Notification>response.json())
            .catch(this.handleError);
    }

    public DeleteNotification = (id: number): Observable<Response> => {
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
