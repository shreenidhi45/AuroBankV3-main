import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { WeatherService } from '../service/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent {

  showError=false;
  weatherData:any;
  errorMessage:any="";
  showData=false

  constructor(private weatherInfo:WeatherService){

    weatherInfo.getWeather().subscribe(
      {
        next:(data)=>
        {
          this.weatherData=data
          this.showData=true

        },
        error:(err:HttpErrorResponse)=>
        {
          this.showError=true;
          this.errorMessage="403 unAuthorized user cannot acces"
        }
      }
    )
  }




}
