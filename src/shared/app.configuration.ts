import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
    baseUrl: string = "http://server_url/api";

    title: string = "Grandma monitor";
}