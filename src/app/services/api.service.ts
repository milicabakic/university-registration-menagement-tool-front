import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {JWT, AcademicYearRegistration, RegistrationForm} from "../model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly apiUrl = environment.backendApi;
  academic_year: number;
  academic_program: string;
  registration_id: number;
  renewed_year: boolean;

  constructor(private httpClient:HttpClient) {
    this.academic_year = 0;
    this.academic_program = "";
    this.registration_id = 0;
    this.renewed_year = false;
  }

  submit_home_form(full_name: string, espb_curr: number, espb_wanted: number, index_number: number, index_year: number,
                    index_academic_program: string, academic_year: number, renewed_year: boolean, academic_program: string): Observable<AcademicYearRegistration> {
    return this.httpClient.post<AcademicYearRegistration>(`${this.apiUrl}/api/registration/student`, {
      "fullName": full_name,
      "currESPB": espb_curr,
      "wantedESPB": espb_wanted,
      "indexNumber": index_number,
      "indexYear": index_year,
      "academicProgramCode": index_academic_program,
      "nextAcademicYear": academic_year,
      "renewedYear": renewed_year,
      "chosenAcademicProgramCode": academic_program
    });
  }


  get_subjects_groups(academic_year: number, academic_program: string, renewed_year: boolean): Observable<RegistrationForm> {
     return this.httpClient.post<RegistrationForm>(`${this.apiUrl}/api/registration/academic-year`, {
        "academicYear": this.academic_year,
        "academicProgramCode": this.academic_program,
        "renewed": this.renewed_year
     });
  }


  submit_subjects_groups_form(registration_id: number, old_subjects: number[], group_odd: number, group_even: number): Observable<string> {
     return this.httpClient.post<string>(`${this.apiUrl}/api/registration/student-choice`, {
            "registrationId": registration_id,
            "oldSubjects": old_subjects,
            "groupOddId": group_odd,
            "groupEvenId": group_even
     });
  }

}
