/*
    Need to retrieve these information from the backend
    so that we can display them onto the account component 
    and allow user to change them as they pleased
*/

export interface UserDetails{
    firstName: string;
    lastName: string
    phone: string;
    email: string;
    password: string;
    status: string // see if user is online or offline, change later
    isActive: Boolean; // for account to be active, user needs to confirm token
    userRole: string;
    enable: Boolean;
}