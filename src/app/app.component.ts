import { Component } from '@angular/core';
import { AppService } from './app.service';

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
  config=undefined;

  constructor(private appService:AppService){
    appService.loadConfig().subscribe(config => {
      this.config = config;
      
      appService.loadCloud(this.config).subscribe(cloud => {
        this.tags = cloud;
        appService.loadUrlList(this.config).subscribe(urls => {
          this.urls = urls;
        });
      });
    });
  }
}
