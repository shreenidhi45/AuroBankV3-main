import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  url="https://localhost:7078/WeatherForecast"
  constructor(private http:HttpClient) { }

  public getWeather()
  {
    return this.http.get(this.url);
  }

}
