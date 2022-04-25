import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';
import { VideosService } from '../videos.service';

@Component({
  selector: 'app-add-video',
  templateUrl: './add-video.component.html',
  styleUrls: ['./add-video.component.css']
})
export class AddVideoComponent implements OnInit {
  video:any;
  role : any;
  subtitle:any;
  thumbnail:any;
  user_Id :any;
  genre:any;
  videoQuality:any;
  uploadVideoForm!:FormGroup;
  serverMessage: any;
  serverSuccess :Boolean = false;
  serverErr:Boolean =  false;
  warning:Boolean = false;
  sideBarOpen = true;
  constructor(
    private videoService:VideosService,
    private _router:Router,
    private fb:FormBuilder,
    private data : DataService
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
    );
    this.role = this.data.getRole();
    console.log(this.role);
    

    
  }
    sideBarToggler(){
      this.sideBarOpen = !this.sideBarOpen
    }
    // Event handling Genre
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
        // console.log(thumbnailFile);
        this.thumbnail = thumbnailFile;
      }
    }
    reset(){
      this.uploadVideoForm.reset()
    }

  upload(){
    this.user_Id = localStorage.getItem('u_Id');
    const formData = new FormData();
    formData.append('video',this.video);
    formData.append('subtitle',this.subtitle);
    formData.append('thumbnail',this.thumbnail);
    formData.append('genre',this.genre);
    formData.append('quality',this.videoQuality)
    formData.append('title',this.uploadVideoForm.get('title')?.value);
    formData.append('tags',this.uploadVideoForm.get('tags')?.value)
    formData.append('userID',this.user_Id);
    // alert(formData);
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
    // this.reset()
  }
 
}
