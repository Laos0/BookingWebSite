import { VERSION } from '@angular/core';
import { environment } from 'src/environments/environment';

export class ApiEndPoints {

    //the version to concat to all api calls
    public static readonly BASEURL: string = environment.apiBaseUrl;

    // the version to concat to all api calls
    public static readonly VERSION1: string = '/api/v1';
    public static readonly TARGET_VERSION: string = ApiEndPoints.BASEURL + ApiEndPoints.VERSION1;

    // http://localhost:8080/api/v1/users
    public static readonly USER: string = ApiEndPoints.TARGET_VERSION + "/users";

    public static readonly USER_CREATE: string = 'registrations';
    public static readonly USER_LOGIN: string = 'authenticate';
    public static readonly USER_LOGOUT: string = 'user/logout';
    
}