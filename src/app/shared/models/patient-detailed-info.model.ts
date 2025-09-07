import { Facility } from "./facilities.model";

export interface PatientDetailedInfo {
    patient_id: number;
    email: string;
    conditions: [],
    sex: string;
    address_street: string;
    address_number: string;
    address_city: string;
    address_postalcode: string;
    firstname: string;
    lastname: string;
    phonenumber: string;
    age: number;
    facility: Facility;
}
