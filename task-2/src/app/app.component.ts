import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  title = 'demo';
  width : number = 5;
  height : number = 5;
  matrixArr : any = [];
  applyForm : FormGroup;
  randDomBallLocation : any = [];
  jokerCoordinates : any = [];

  constructor(private fb : FormBuilder){}
  
  ngOnInit(){
    this.applyForm = this.fb.group({
      m_width : new FormControl(2, Validators.required),
      m_height : new FormControl(2, Validators.required)
    })
    this.createMatrix(2,2);
  }

  get m_width(){
    return this.applyForm.controls.m_width;
  }
  get m_height(){
    return this.applyForm.controls.m_height;
  }

  onMove(ev){
    console.log(ev)
  }

  apply(form){
    console.log(form.value)
    if(!form.valid) return false;
    this.createMatrix(form.value.m_width, form.value.m_height)
  }

  createMatrix(width, height){
    let arr = [];
    let subArr = [];
    for(let i = 0; i < height; i++){
      subArr = [];
      for(let j = 0; j < width; j++){
        subArr.push([i,j])
      }
      arr.push(subArr)
    }
    this.matrixArr = arr;
    setTimeout(() => {
      this.putRandomBalls(width, height)
    }, 1000);
    console.log('array =', arr)
  }

  putRandomBalls(width, height){
    this.randDomBallLocation = [];
    let image = '<img width="20" height="20" src="assets/images.png">';

    for(let i = 0; i < width; i++){
      let arr = [];
      arr.push(this.randomRange(0, width-1));
      arr.push(this.randomRange(0, height-1));
      document.getElementsByClassName('node'+ arr[0] + '' + arr[1])[0].innerHTML = image;
      this.randDomBallLocation.push(arr);
    }
    this.bindJoker(width, height);
    console.log('randDomBallLocation =', this.randDomBallLocation, this.jokerCoordinates)
  }



  bindJoker(width, height){
    this.jokerCoordinates = [];
    this.jokerCoordinates.push(this.randomRange(0, width-1));
    this.jokerCoordinates.push(this.randomRange(0, height-1));

    let filterMap = this.randDomBallLocation.filter((v)=>{
      if(v[0] == this.jokerCoordinates[0] && v[1] == this.jokerCoordinates[1]){
        return v;
      }
    })

    if(filterMap.length > 0){
      this.bindJoker(width, height);
      return false;
    }
    
    let joker = '<img width="20" height="20" src="assets/joker.jpg">';
    this.jokerCoordinates.push(this.randomRange(0, width-1))
    this.jokerCoordinates.push(this.randomRange(0, height-1))
    document.getElementsByClassName('node'+ this.jokerCoordinates[0] + '' + this.jokerCoordinates[1])[0].innerHTML = joker;
  }

  randomRange(min, max) {
    return ~~(Math.random() * (max - min + 1)) + min
  }
}
