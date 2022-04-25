import { Component, OnInit } from '@angular/core';
import { VideosService } from '../videos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { videosModel } from '../Models/videos.model';
import { FormControl, Validators } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-single-video',
  templateUrl: './single-video.component.html',
  styleUrls: ['./single-video.component.css']
})
export class SingleVideoComponent implements OnInit {
  // Variables : 
  isRootUser !: Boolean;
  isAdmin !: Boolean;
  isUser !: Boolean;
  role : any;
  videoId : any;
  reportVideoResponse : any;
  deleteVideoResponse !: Boolean;
  singleVideo : videosModel[] | any;
  tags : any = [];
  currentRate:number = 0;
  ReportSelectValue : any 
  ctrl = new FormControl(null, Validators.required);
  constructor(
    private video:VideosService,
    private _data : DataService,
    private activatedRoute:ActivatedRoute,
    private router:Router

  ) { }

  ngOnInit(): void {
    // Get the single video from backend to stream :
    this.videoId = this.activatedRoute.snapshot.params['id'];
    this.video.getSingleVideo(this.videoId)
    .subscribe((video) => {
      this.singleVideo = JSON.parse(JSON.stringify(video));
      console.log(this.singleVideo.tags);
      
      this.tags = this.singleVideo.tags.split(',')  || this.singleVideo.tags
    });

    // Get the role of user logged in to give access to delete video button:
    this._data.getRole()
    .subscribe({
      next: res => {
        this.role = res;
        // console.log(this.role);
        
        if(this.role[0] == [3333]){
         this.isUser = true
          // console.log( `User Logged in is  ${ this.isUser}`);
          
        }
        else if(this.role[0] == [5555]){
         this.isAdmin = true
          // console.log(`Admin Logged in is ${ this.isAdmin}`);

        }
        else{
          this.isRootUser = true;
          // console.log(`Root User Logged in is  ${ this.isRootUser}`);

        }
      },
      error: err => {
        console.log(err);
        
      }
    });
  }

  sideBarOpen = true;
  sideBarToggler(){
    this.sideBarOpen = !this.sideBarOpen
  }
  // Delete Video Btn => Function
  deleteVideo(videoId : any, el:HTMLElement){
    el.scrollIntoView({behavior: 'smooth'});
   this.video.deleteSingleVideo(videoId)
   .subscribe({
     next: (res) => {
       console.log(res);
        this.deleteVideoResponse = true;
        if(this.isRootUser){
          setTimeout(() => {
            this.router.navigate(['/rootUserDash']);
          }, 2000);
        }
        else if(this.isAdmin){
          setTimeout(() => {
            this.router.navigate(['/adminDashboard']);
          }, 2000);
        }
     },
     error: (err) => {
       console.log(err);
       
     }
   });
  }
  // Report Reason Radio Button :
  onItemChange(event : any){
    this.ReportSelectValue = event.target.value;
    // console.log(" Value is : ", this.ReportSelectValue );
 }
  // Report Video Func to call Report Video API:
  reportVideo(videoId : any){
    console.log(this.ReportSelectValue);
    this.video.report(videoId,this.ReportSelectValue)
    .subscribe({
      next: (res) => {
        this.reportVideoResponse = `The video - ${this.singleVideo.title} is reported successfully. Our panel will investigate and take action.`
        console.log(res);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      },
      error: (err) => {
        console.log(err);
        
      }
    })
  }
  submitRate(videoId : any){
    console.log(this.currentRate);
    // MAKE AN API FOR INSERTING THE RATING OF VIDEO BY UPDATION IN DB
    this.video.rateVideo(videoId,this.currentRate)
    .subscribe({
      next: (res) => {
        console.log(res);
        
      },
      error: (err) => {
        console.log(err);
        
      }
    })
  } 
}
