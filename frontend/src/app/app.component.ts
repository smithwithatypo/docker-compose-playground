import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'frontend';
  test = "hello"
  message: string = '';
  responseMessage: string = '';
  messages: any[] = [];

  constructor(private http: HttpClient) {}

  createTable() {
    this.http.post('http://localhost:3000/create-table', {}).subscribe({
      next: response => {
        console.log('Table created', response);
      },
      error: error => {
        console.error('Error creating table', error);
      }
    });
  }

  addMessage() {
    this.http.post('http://localhost:3000/insert-message', { message: this.message }).subscribe({
      next: response => {
        console.log('Message inserted', response);
        this.responseMessage = 'Message inserted successfully';
      },
      error: error => {
        console.error('Error inserting message', error);
        this.responseMessage = 'Error inserting message';
      }
    });
  }

  getAllMessages() {
    this.http.get<{ messages: any[] }>('http://localhost:3000/messages').subscribe({
      next: response => {
        this.messages = response.messages;
        console.log('Messages retrieved', this.messages);
      },
      error: error => {
        console.error('Error retrieving messages', error);
      }
    });
  }


}
