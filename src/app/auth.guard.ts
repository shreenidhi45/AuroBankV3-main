import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataServiceService } from './service/data-service.service';
 
interface MyRouteData {
  role?: string;
}
 
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 
  constructor(private router: Router, private dataService: DataServiceService) {}
 
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.dataService.userId) {
      const routeData = route.data as MyRouteData;
      console.log('User Role:', this.dataService.role);
      console.log('Route Role:', routeData?.role);
 
      const userRole = this.dataService.role || 'user'; // Fallback value, replace with the default role
 
      if (routeData && routeData.role && routeData.role !== userRole) {
        console.log('Redirecting to login due to role mismatch');
        return this.router.createUrlTree(['/']);
      }
 
      console.log('User is authenticated and has the correct role');
      return true;
    }
 
    console.log('User is not authenticated. Redirecting to login');
    return this.router.createUrlTree(['/']);
  }
}