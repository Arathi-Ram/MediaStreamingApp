import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { VideosService } from '../videos.service';

@Component({
  selector: 'app-home-rootuser',
  templateUrl: './home-rootuser.component.html',
  styleUrls: ['./home-rootuser.component.css']
})
export class HomeRootuserComponent implements OnInit {
  video:any;
  subtitle:any;
  thumbnail:any;
  user_Id :any;
  genre:any;
  uploadVideoForm!:FormGroup;
  serverMessage: any;
  serverSuccess :Boolean = false;
  serverErr:Boolean =  false;
  videoQuality:any;
  warning:Boolean = false;
  sideBarOpen = true;

  @ViewChild('scroll') scroll : ElementRef | any;
  
  constructor(
    private videoService:VideosService,
    private _router:Router,
    private fb:FormBuilder
  ) { }

  ngOnInit(): void {
    this.uploadVideoForm = this.fb.group({
      title:['',Validators.required],
      tags:['',Validators.required],
      video:['',Validators.compose([Validators.required])],
      thumbnailFile:['',Validators.compose([Validators.required])],
      subtitle:['',Validators.compose([Validators.required])]
      // genre:[Validators.compose([Validators.required])]
    }
    )
  }
  sideBarToggler(){
    this.sideBarOpen = !this.sideBarOpen
  }
  onGenreInput(event:any){
    this.genre = event.target.value;
    // console.log(this.genre);
    
  }
   // Event handling Video Quality
   onQualityInput(event:any){
    this.videoQuality = event.target.value;
    // console.log(this.videoQuality);
    
  }
  // File Change for Video File Upload
  onFileChange(event:any){
    if(event.target.files.length>0){
      const file = event.target.files[0];
      // console.log(file);
      this.video = file;
    }      
  }
  // File Change for Subtitle File Upload
  onSubtitleFileChange(event:any){
    if(event.target.files.length>0){
      const subtitleFile = event.target.files[0];
      // console.log(subtitleFile);
      this.subtitle = subtitleFile;
    }
  }
  // File Change for Thumbnail File Upload
  onThumbnailFileChange(event:any){
    if(event.target.files.length>0){
      const thumbnailFile = event.target.files[0];
      console.log(thumbnailFile);
      this.thumbnail = thumbnailFile;
    }
  }

upload(el:HTMLElement){
  this.user_Id = localStorage.getItem('Id');
  const formData = new FormData();
  formData.append('video',this.video);
  formData.append('subtitle',this.subtitle);
  formData.append('thumbnail',this.thumbnail);
  formData.append('genre',this.genre);
  formData.append('title',this.uploadVideoForm.get('title')?.value);
  formData.append('tags',this.uploadVideoForm.get('tags')?.value);
  formData.append('userID',this.user_Id);
  el.scrollIntoView({behavior: 'smooth'});
  this.warning = true
  this.videoService.uploadVideo(formData)
  .subscribe({
    next: (res) => {
      this.warning = false
      this.serverSuccess = true
      console.log(res);
      setTimeout(() => {
        window.location.reload();
        this.serverSuccess = false;
      }, 3000);      
    },
    error: (err) => {
      this.warning = false
      this.serverErr = true;
      this.serverMessage = err.error.error || "Failed to Load resource. Try Again"
      console.log(`server msg = ${ this.serverMessage}`);
      setTimeout(() => {
        this.serverErr = false
      }, 3000);
      }
  });
}
}

