import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterGenre: string) {
    if(filterGenre === ''){
      return value;
    }
    const videos = [];
    for (const video of value){
      if(video['genre'] === filterGenre){
        videos.push(video);
      }
    }
    return videos
  }

}
