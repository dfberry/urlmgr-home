import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dfberry.io';
  tag=undefined;
  urls=undefined;
  currentTag:string=undefined;
  tags=undefined;
}
