import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
// import { HttpUtilsService } from './utils/http-utils.service';
import { environment } from './../environments/environment'

const API_CUSTOMERS = '/api/v1/customers/';
const API_VEH_DASHBOARD = '/api/v1/dashboard/status';
//Constant JSON webtoken for Simulation purposes
const JSON_WEBTOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidGVzdCIsImlhdCI6MTU3NDM0OTYzNiwiZXhwIjoxNjA1OTA3MjM2fQ.q13N2siftymEvCl8RNXXYkqzuASbm5bYvaoF1jIMV-w'


let headers = new HttpHeaders();
headers = headers.append('authorization', JSON_WEBTOKEN);

@Injectable({
  providedIn: 'root',
})
export class ApiCallingService {

  public data;
  public refreshQuery = ''

  constructor(private http: HttpClient) { }



  /**
   * Get Vehicles based on connectivity Status
   * 
   * @param status connect or disconnect
   */
  // TODO ToBR
  /* getVehByCustomerStatus(status: string): Observable<any> {
    return this.http.get<any>(environment.apiPath + API_VEH_BY_STATUS + '/?type=' + status);
  } */

  /**
   * Get Customer
   */
  getVehByCustomer(): Observable<any> {
    return this.http.get<any>(environment.apiPath + API_CUSTOMERS, { headers });
  }

  /**
   * Getting Real time Dashboard status
   */
  getVehDashboard(queryParams: string): Observable<any> {
    this.refreshQuery = queryParams;
    let url = environment.apiPath + API_VEH_DASHBOARD + this.refreshQuery
    return this.http.get<any>(url, { headers });
  }

  /**
* Handle Http operation that failed.
* Let the app continue.
* @param operation - name of the operation that failed
* @param result - optional value to return as the observable result
*/
  private handleError<T>(operation = 'operation', result?: any) {
    return (error: any): Observable<any> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return from(result);
    };
  }

}
