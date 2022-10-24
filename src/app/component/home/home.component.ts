import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AcademicProgram, AcademicYearRegistration} from "../../model";
import {ApiService} from "../../services/api.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  full_name: string;
  espb_curr: string;
  espb_wanted: string;
  index_number: string;
  index_year: string;
  index_academic_program: AcademicProgram;
  academic_program: string;
  academic_programs: AcademicProgram[];
  academic_year: string;
  renewed_year: boolean;
  FORM_ERROR: string;
  SUBMIT_ERROR: string;
  private api_response: AcademicYearRegistration;


  constructor(private router: Router, private apiService: ApiService) {
    this.full_name = "";
    this.espb_curr = "";
    this.espb_wanted = "";
    this.index_number = "";
    this.index_year = "";
    this.index_academic_program = {} as AcademicProgram;
    this.academic_program = "";
    this.academic_programs = [];
    this.academic_year = "";
    this.renewed_year = false;
    this.FORM_ERROR = "Proverite da li su sva polja ispravno popunjena.";
    this.SUBMIT_ERROR = "Doslo je do greške, pokušajte ponovo."
    this.api_response = {} as AcademicYearRegistration;
  }

  ngOnInit(): void {
    this.apiService.get_academic_programs()
      .subscribe(res => {
        this.academic_programs = res;
      }, (err) => {
        console.log("400 Bad Request")
      })
  }

  student_info(): void {
     if (!this.validate_form()) {
          alert(this.FORM_ERROR);
          return;
     }

     this.apiService.submit_home_form(this.full_name, parseInt(this.espb_curr), parseInt(this.espb_wanted),
                                      parseInt(this.index_number), parseInt(this.index_year), this.index_academic_program.code,
                                      parseInt(this.academic_year), this.renewed_year, this.academic_program)
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

  select_academic_program(program: AcademicProgram): void {
    this.academic_program = program.code;
  }

  validate_form(): boolean {
    if(this.full_name == "" || this.espb_curr == "" || this.espb_wanted == "" || this.index_number == "" ||
        this.index_year == "" || this.index_academic_program.code == "" || this.academic_year == "") {
        console.log("neispravne vrednosti")
        return false;
    }

    if(this.is_number(this.espb_curr) && this.is_number(this.espb_wanted) && this.is_number(this.index_number) &&
        this.is_number(this.index_year) && this.is_number(this.academic_year)) {
      console.log("uneti stringovi za integer vrednosti, sve ok")
      return true;
    }

    return false;
  }

  is_number(string: string): boolean {
    if(isNaN(parseInt(string))) {
      return false;
    }
    return true;
  }

  reset_form(): void {
    // this.full_name = "";
    // this.espb_curr = "";
    // this.espb_wanted = "";
    // this.index_number = "";
    // this.index_year = "";
    // this.index_academic_program = "";
    // this.academic_program = "";
  }


  save_values(): void {
    this.apiService.academic_year = parseInt(this.academic_year);
    this.apiService.academic_program = this.academic_program;
    this.apiService.renewed_year = this.renewed_year;
    this.apiService.registration_id = this.api_response.id;
  }

}
