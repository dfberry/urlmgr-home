import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';


@Injectable()
export class AppService {

  constructor(private http: Http) {
  }
  
  loadConfig() {
    return this.http
    .get('/config.json')
    .map((response: Response) => response.json());
  }
  loadCloud(config) {

    if(!config || !config.apiUrl) return Observable.throw('error constructing api url');

    let url = config.apiUrl + 'tags/all';

    return this.http
    .get(url)
    .map((response: Response) => {
      let json = response.json();
      let tags = json.data.tags;
      return tags;
    }).map(this.prepTagsForCloud);

  }
 

  //    determine weight
  prepTagsForCloud(tags){
    if(tags && tags.length>0){

      // sort from biggest to smallest count
      // ignoring text of tag 
      tags.sort(function(a,b){
        return  b.count - a.count;
      });

      //if more than 20 items, take top 20 
      //more items doesn't make sense in a tag cloud
      if(tags.length>20) tags = tags.slice(0,19);

      // 20% slice - 5 levels of font size
      let slice = Math.ceil(tags.length / 5) ;
      let sliceWeight = 25;
      let currentSlice = slice;
      
      // right now the link doesn't mean anything because it is all private links
      tags.forEach((tag,index) => {
        
        console.log(tag);
        tag.text = tag.tag;
        
        //tag.link = "#tag=" + encodeURI(tag.tag); 
        //tag.handlers = {click: function(ev) { 
        //  console.log(ev.target.text); 
        //} };
        console.log(tag.link);

        if (index<currentSlice){
          tag.weight = sliceWeight;
        } else {
          currentSlice += slice;
          sliceWeight -= slice;
          tag.weight = sliceWeight;
        }
      });

      return tags;
    } 
  }

  loadUrlList(config): Observable<any>{

      let url = config.apiUrl + "urls/public/";
      let options = undefined;

      return this.http.get(url, options)
      .map((response: Response) => {
        let json = response.json();
        let urls = json.data.urls;
        return urls;
      });
  }
  
  // public url list
  // array of tags
  loadUrlsByTag(config,tag): Observable<any>{

      if(!config || !config.apiUrl || !tag) return Observable.of([]); 

      let url = config.apiUrl + "urls/tags";
      let options = undefined;  
      let tagArray = [];
      tagArray.push(tag);  
      let tagObj = {tags: tagArray};

      console.log(tagObj);

      return this.http.post(url, tagObj)
      .map((response: Response) => {
          let mydata = response.json();
          console.log(mydata);
          if(mydata && mydata.data) return mydata.data;
          return [];
      });
  }
}