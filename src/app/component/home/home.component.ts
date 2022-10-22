import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AcademicYearRegistration} from "../../model";
import {ApiService} from "../../services/api.service";


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
    this.api_response = {} as AcademicYearRegistration;
  }

  ngOnInit(): void {
  }

  student_info(): void {
     if (!this.validate_form()) {
          alert(this.FORM_ERROR);
          return;
     }

     this.apiService.submit_home_form(this.full_name, this.espb_curr, this.espb_wanted, this.index_number, this.index_year,
                                      this.index_academic_program, this.academic_year, this.renewed_year, this.academic_program)
     .subscribe( res => {
             this.api_response = res;
             this.save_values();
             this.router.navigate(['upis']);
           }, (error) => {
             alert(this.SUBMIT_ERROR);
             this.reset_form();
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
    this.academic_program = "";
  }


  save_values(): void {
    this.apiService.academic_year = this.academic_year;
    this.apiService.academic_program = this.academic_program;
    this.apiService.renewed_year = this.renewed_year;
    this.apiService.registration_id = this.api_response.id;
  }

}
