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
  renewed_year: boolean;


  constructor(private router: Router, private apiService: ApiService) {
    this.registration_response = {} as RegistrationForm;
    this.groups_odd = [];
    this.groups_even = [];
    this.subjects_odd = [];
    this.subjects_even = [];
    this.academic_year = apiService.academic_year;
    this.renewed_year = apiService.renewed_year;
  }


  ngOnInit(): void {
    this.apiService.get_subjects_groups(this.apiService.academic_year, this.apiService.academic_program, this.apiService.renewed_year)
      .subscribe(res => {
        this.registration_response = res;
        this.initVariables();
      });
  }

  initVariables(): void {
    this.groups_odd = this.registration_response.groupsOdd;
    this.groups_even = this.registration_response.groupsEven;
    this.subjects_odd = this.registration_response.subjectsOdd;
    this.subjects_even = this.registration_response.subjectsEven;
  }

}
