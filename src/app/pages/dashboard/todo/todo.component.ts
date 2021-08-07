import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { AuthService } from 'src/app/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  currentDate: string;

  public staticTodoItems = [
    {
      id: 1,
      title: 'Daily scrum call',
      description: 'daily scrum call with team ',
      isComplete: true
    },
    {
      id: 2,
      title: 'Gym time',
      description: 'daily scrum call with team ',
      isComplete: true
    },
    {
      id: 3,
      title: 'Have coffee',
      description: 'daily scrum call with team ',
      isComplete: true
    },
    {
      id: 4,
      title: 'Lunch with Azra',
      description: 'daily scrum call with team ',
      isComplete: true
    },
    {
      id: 4,
      title: 'Lunch with Azra',
      description: 'daily scrum call with team ',
      isComplete: true
    },
 
    

  ]

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.currentDate = moment().format(" Do MMM  YY");
    this.currentUserData()
  }

  public currentUserData() {
    let user = this.authService.getCurrentLoggedInUser();
    // console.log(user[0]);
  }
}
