import { Component, OnInit } from '@angular/core';
import { videosModel } from '../Models/videos.model';
import { VideosService } from "../videos.service";
@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.css']
})
export class DashboardUserComponent implements OnInit {
  videosList : videosModel[] | any;
  thumbnail : any;
  genreSelected : any = '' ;
  constructor(
    private videoService:VideosService
  ) { }

  ngOnInit(): void {
    this.videoService.getAllVideos()
    .subscribe((allVideos) => {
      this.videosList = JSON.parse(JSON.stringify(allVideos));
    });
  }
  
  sideBarOpen = true;
  sideBarToggler(){
    this.sideBarOpen = !this.sideBarOpen
  }

  getGenre(event:any){
    if(event){
      this.genreSelected = event.target.value;
      console.log(this.genreSelected);
      
    }
    else{
      this.genreSelected = '' ;
    }
  
  }


}
