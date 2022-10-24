import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Group, RegistrationForm, Subject} from "../../model";
import {ApiService} from "../../services/api.service";


@Component({
  selector: 'app-subjects-groups',
  templateUrl: './subjects-groups.component.html',
  styleUrls: ['./subjects-groups.component.css']
})
export class SubjectsGroupsComponent implements OnInit {

  registration_response: RegistrationForm;
  groups_odd: Group[];
  groups_even: Group[];
  subjects_odd: Subject[];
  subjects_even: Subject[];
  academic_year: number;
  academic_years: string[];
  renewed_year: boolean;
  group_odd_selected: Group;
  group_even_selected: Group;
  subjects_odd_selected: Subject[];
  subjects_even_selected: Subject[];
  ERROR_MESSAGE: string;


  constructor(private router: Router, private apiService: ApiService) {
    this.registration_response = {} as RegistrationForm;
    this.groups_odd = [];
    this.groups_even = [];
    this.subjects_odd = [];
    this.subjects_even = [];
    this.academic_year = apiService.academic_year;
    this.academic_years = ["I", "II", "III", "IV"];
    this.renewed_year = apiService.renewed_year;
    this.group_odd_selected = {} as Group;
    this.group_even_selected = {} as Group;
    this.subjects_odd_selected = [];
    this.subjects_even_selected = [];
    this.ERROR_MESSAGE = "Došlo je do greške, pokušajte ponovo."
  }


  ngOnInit(): void {
    //for testing

    // this.apiService.get_subjects_groups(4, "RN", false)
    //   .subscribe(res => {
    //     this.registration_response = res;
    //     this.groups_odd = this.registration_response.groupsOdd;
    //     this.groups_even = this.registration_response.groupsEven;
    //     this.subjects_odd = this.registration_response.subjectsOdd;
    //     this.subjects_even = this.registration_response.subjectsEven;
    //     this.renewed_year = false;
    //     this.academic_year = 4;
    //   });


    this.apiService.get_subjects_groups(this.apiService.academic_year, this.apiService.academic_program, this.apiService.renewed_year)
      .subscribe(res => {
        this.registration_response = res;
        this.initVariables();
      });
  }

  submit(): void {
    let old_subjects = this.getSubjects();

    this.apiService.submit_subjects_groups_form(this.apiService.registration_id, old_subjects,
                                                this.group_odd_selected.id, this.group_even_selected.id)
      .subscribe(res => {
        this.router.navigate(['upis/prihvacen']);
      }, (error) => {
        alert(this.ERROR_MESSAGE);
      });
  }

  is_year_renewed(): boolean {
    return this.apiService.renewed_year;
  }

  select_subject_even(subject: Subject): void {
    if(!this.subjects_even_selected.includes(subject)) {
      this.subjects_even_selected.push(subject);
    }
  }

  select_subject_odd(subject: Subject): void {
    if(!this.subjects_odd_selected.includes(subject)) {
      this.subjects_odd_selected.push(subject);
    }
  }

  select_group_odd(group: Group): void {
    this.group_odd_selected = group;
  }

  select_group_even(group: Group): void {
    this.group_even_selected = group;
  }

  private initVariables(): void {
    this.groups_odd = this.registration_response.groupsOdd;
    this.groups_even = this.registration_response.groupsEven;
    this.subjects_odd = this.registration_response.subjectsOdd;
    this.subjects_even = this.registration_response.subjectsEven;
    this.renewed_year = this.apiService.renewed_year;
  }

  private getSubjects(): number[] {
    let subjects = [];
    for(let s of this.subjects_odd_selected) {
      subjects.push(s.id);
    }
    for(let s of this.subjects_even_selected) {
      subjects.push(s.id);
    }
    return subjects;
  }

}
