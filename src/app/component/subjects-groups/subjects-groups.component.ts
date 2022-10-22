import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ApiService} from "../../service/api.service";
import {RegistrationForm} from "../model";


@Component({
  selector: 'app-subjects-groups',
  templateUrl: './subjects-groups.component.html',
  styleUrls: ['./subjects-groups.component.css']
})
export class SubjectsGroupsComponent implements OnInit {

  registration_response: RegistrationForm;
  groups_even: Group[];
  groups_odd: Group[];
  subjects: Subject[];
  academic_year: number;
  renewed_year: boolean;


  constructor(private router: Router, private apiService: ApiService) {
    this.academic_year = apiService.academic_year;
    this.renewed_year = apiService.renewed_year;
  }


  ngOnInit(): void {
    this.apiService.get_subjects_groups
                    .subscribe( res => {
                      this.registration_response = res;
                      initVariables();
                    });
  }

  initVariables(): void {
    this.groups_even = this.registration_response.groupsEven;
    this.groups_odd = this.registration_response.groupsOdd;
    this.subjects = this.registration_response.subjects;
  }

}
