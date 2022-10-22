import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

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


  constructor(private router: Router) {
    this.full_name = "";
    this.espb_curr = 0;
    this.espb_wanted = 0;
    this.index_number = 0;
    this.index_year = 0;
    this.index_academic_program = "";
  }

  ngOnInit(): void {
  }

  student_info(): void {
    this.router.navigate(['upis']);
  }
}
