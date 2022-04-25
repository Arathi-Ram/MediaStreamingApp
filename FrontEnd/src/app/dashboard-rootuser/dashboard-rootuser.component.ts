import { Component, OnInit } from '@angular/core';
import { videosModel } from '../Models/videos.model';
import { VideosService } from "../videos.service";
@Component({
  selector: 'app-dashboard-rootuser',
  templateUrl: './dashboard-rootuser.component.html',
  styleUrls: ['./dashboard-rootuser.component.css']
})
export class DashboardRootuserComponent implements OnInit {

  constructor(
    private videoService:VideosService
  ) { }
  videosList : videosModel[] |any ;
  thumbnail  : any ;
  genreSelected : any = '' ;


      ngOnInit() : void {
        this.videoService.getAllVideos()
        .subscribe((allVideos) => {
          this.videosList = JSON.parse(JSON.stringify(allVideos));
          // this.thumbnail = "../../../../Backend/src/uploads/thumbnail/{{video.thumbnailName}}"
          // console.log(this.videosList[0].rating);
          
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
