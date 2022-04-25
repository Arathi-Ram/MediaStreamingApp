import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  constructor() { }
  currentRate:number = 0;
  ctrl = new FormControl(null, Validators.required);
  ngOnInit(): void {
  }
  submitRate(){
    console.log(this.currentRate);
    
  }  
}
