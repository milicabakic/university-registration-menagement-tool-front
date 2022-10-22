import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ApiService} from "../../service/api.service";
import {AcademicYearRegistration} from "../model";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  full_name: string;
  espb_curr: number;
  espb_wanted: number;
  index_number: number;
  index_year: number;
  index_academic_program: string;
  academic_program: string;
  academic_year: number;
  renewed_year: boolean;
  FORM_ERROR: string;
  SUBMIT_ERROR: string;
  private api_response: AcademicYearRegistration;


  constructor(private router: Router, private apiService: ApiService) {
    this.full_name = "";
    this.espb_curr = 0;
    this.espb_wanted = 0;
    this.index_number = 0;
    this.index_year = 0;
    this.index_academic_program = "";
    this.academic_program = "";
    this.academic_year = 0;
    this.renewed_year = false;
    this.FORM_ERROR = "Sva polja su obavezna!";
    this.SUBMIT_ERROR = "Doslo je do greške, pokušajte ponovo."
  }

  ngOnInit(): void {
  }

  student_info(): void {
     if (!validate_form()) {
          alert(this.FORM_ERROR);
          return;
     }

     this.apiService.submit_home_form(this.full_name, this.espb_curr, this.espb_wanted, this.index_number, this.index_year,
                                      this.index_academic_program, this.academic_year, this.renewed_year, this.academic_program)
     .subscribe( res => {
             api_response = res;
             save_values(api_response.id);
             this.router.navigate(['upis']);
           }, (error) => {
             alert(this.SUBMIT_ERROR);
             reset_form();
           }
     );
    //this.router.navigate(['upis']);
  }


  validate_form(): boolean {
    if(this.full_name == "" || this.espb_curr == 0 || this.espb_wanted == 0 || this.index_number == 0 ||
        this.index_year == 0 || this.index_academic_program == "" || this.academic_year == 0) {
        return false;
    }

    return true;
  }


  reset_form(): void {
    this.full_name = "";
    this.espb_curr = 0;
    this.espb_wanted = 0;
    this.index_number = 0;
    this.index_year = 0;
    this.index_academic_program = "";
    this.academic_program = 0;
  }


  save_values(registration_id: number): void {
    this.apiService.academic_year = this.academic_year;
    this.apiService.academic_program = this.academic_program;
    this.apiService.renewed_year = this.renewed_year;
    this.apiService.registration_id = registration_id;
  }

}
