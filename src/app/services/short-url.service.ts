import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShortUrlService {

  shortUrlData:any[];

  constructor(private http:HttpClient) { }



  shrinkUrl(url){
    let lst = [];
    this.http.post('http://localhost:5000/shorten', url)
    .subscribe((res) => {
        lst.push(res)    
        this.shortUrlData = lst
        console.log(res)
    })
  }

}
