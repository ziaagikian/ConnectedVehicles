import { Component, OnInit } from '@angular/core';
import { ApiCallingService } from '../api-calling.service';
import { environment } from './../../environments/environment'


@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {

  constructor(public apiService: ApiCallingService) { }

  ngOnInit() {
    this.syncData();
  }

  syncData(): void {
    setInterval(() => {

      this.apiService.getVehDashboard(this.apiService.refreshQuery).subscribe(Response => {
        this.apiService.data = Response.entities;
      });
    }, environment.apiPollingInterval);
  }

  // used as a table reset
  getAllVehicles(): void {
    this.apiService.getVehDashboard('').subscribe(Response => {
      this.apiService.data = Response.entities;
    });
  }
}
