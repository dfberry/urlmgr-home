import { Component } from '@angular/core';
import { AppService } from './app.service';
import { SelectedTagComponent } from './selectedTag.component';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router'; 

import * as $ from 'jquery';
import 'jqcloud2';

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
  options: any = {
    // if width is between 0 and 1 it will be set to the size of the upper element multiplied by the value 
    width : 500,
    height : 350,
    overflow: false,
  }

  constructor(
    private appService:AppService,
    private activatedRoute: ActivatedRoute ){
      this.activatedRoute.fragment.subscribe ( f => {
        //const element = document.querySelector ( "#" + f )
        //if ( element ) element.scrollIntoView ( element )
        console.log(f);
        let tempTag = decodeURI(f);
        this.tag = tempTag.substring(4,tempTag.length);
        console.log(this.tag);

    });
  }
  ngOnInit() {
    console.log("ngOnInit");
    this.appService.loadConfig().subscribe(config => {
      this.config = config;
      this.appService.loadCloud(this.config).subscribe(cloud => {
        this.tags = cloud;
        this.appService.loadUrlList(this.config).subscribe(urls => {
          this.urls = urls;
          
          console.log(this.urls);
          console.log(this.tags);
          // set data
          $('.cloud').jQCloud(this.tags,this.options);
      
        });
      });
    });

  }
  ngOnChange(){
  }

}
