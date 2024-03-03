import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

type User = {
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'angular-cypress-cucumber';
  url = "https://jsonplaceholder.typicode.com/users";
  users: User[] = [];

  constructor(private httpClient: HttpClient) {}

  getUsers() {
    this.httpClient.get<User[]>(this.url).subscribe(
      {
        next: (res) => {
          this.users = res;
        },
        error: (err: any) => {
          alert("Something went wrong!");
         },
        complete: () => { }
      }
    );
	}
}
