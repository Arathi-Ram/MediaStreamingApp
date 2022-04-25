import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VideosService {

  constructor(
    private http:HttpClient
  ) { }

    // API Handling The Video Uploading to Backend API
    uploadVideo(video:any){
      return this.http.post("http://localhost:3000/upload/new-video",video)
    }

    // API handling getting all the videos from Backend to display in all-videos template:
    getAllVideos(){
      return this.http.get("http://localhost:3000/videos/all-videos")
    }
    
    // API handling getting the single vides from Backend to display in single video template using the video ID:
    getSingleVideo(id:any){
      return this.http.get("http://localhost:3000/videos/watch/" +id)
    }

    // API handling the deleteion of video by admin as per selected video ID:
    deleteSingleVideo(id : any){
      return this.http.delete("http://localhost:3000/videos/delete/" + id)
    }

    // API handling report function of a single video when a user or admin reports a video
    report(id : any, reportReason : any){
      return this.http.post("http://localhost:3000/videos/report/" + id, {"reportReason":reportReason})
    }

    // API handling the saving of the rating stars given to a single video by a user or admin :
    rateVideo(id : any, rating : any){
      return this.http.put("http://localhost:3000/videos/rate/" + id, {"rating" : rating})
    }

    // API handling the retrieval of rating of a video to display in all videos component:
    getVideoRating(id:any){
      return this.http.get("http://localhost:3000/videos/ratings/" + id)
    }
}
