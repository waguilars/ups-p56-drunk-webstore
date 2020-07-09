import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-licores',
  templateUrl: './licores.component.html'
})
export class LicoresComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  verLicores(idx:number){
    console.log(idx);
  }

}
