export class videosModel{
    constructor(
        public _id:string,
        public name:string,
        public title:string,
        public genre:string,
        public videoName:string,
        public videoPath:string,
        public videoQuality:string,
        public tags:string,
        public thumbnailName:string,
        public thumbnailPath:string,
        public subtitleName:string,
        public subtitlePath:string,
        public createdAt:string
    ) {
        
    }
}