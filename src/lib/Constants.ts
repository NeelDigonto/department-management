import process from "process";

export const APP_NAME: string = process.env.APP_NAME;
export const APP_SITE_BASE_URL: string = "http://localhost:3000/";
export const PROFILE_SHEET_NAME: string = "Profile";
//export const CENTRAL_COLLECTION_NAME: string = "central";
export const CENTRAL_EMPLOYEE_ID: string = "CENTRAL";
export const CENTRAL_EMPLOYEE_PASSWORD: string = "none";
export const FACULTY_COLLECTION_NAME: string = "faculties";

export const RESERVED_EMPLOYEE_NAMES: string[] = [CENTRAL_EMPLOYEE_ID];
