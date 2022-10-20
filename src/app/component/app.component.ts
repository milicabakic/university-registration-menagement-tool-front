import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'University Registration Management';
  username: string;
  password: string

    constructor(private router: Router) {
      this.username = "";
      this.password = "";
    }

    ngOnInit(): void {
    }

    login(): void {
        console.log("tekst")
        this.router.navigate(['home']);
    }
//     if(this.password == "" || this.username == ""){
//       alert('All fields are required!');
//       return;
//     }


}
