import { Component, OnInit } from '@angular/core';
import { ApiCallingService } from '../api-calling.service';
import { Observable } from 'rxjs';

const filterByCustomer = "?customer="
const FILTER_CONN = "?status="

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})

export class FiltersComponent implements OnInit {

  public VehByCustomer$: Observable<any>;


  constructor(private ApiCallingService: ApiCallingService) { }

  // Call Vehicle API on Start of  this module
  ngOnInit() {
    this.VehByCustomer$ = this.ApiCallingService.getVehByCustomer();
  }

  // Customer Dropdown
  getCustomerData(id: number): void {
    //this.ApiCallingService.getVehByCustomerId(id);
    this.ApiCallingService.getVehDashboard(filterByCustomer + id).subscribe(vehList => {
      if (vehList.success)
        this.ApiCallingService.data = vehList.entities
      else
        this.ApiCallingService.data = null
    });
    // this.ApiCallingService.data = response.entities;

  }

  // Filter Dropdown
  getVehicleStatus(status: string): void {
    // this.ApiCallingService.getVehByCustomerStatus(status).subscribe(response => {
    //   this.ApiCallingService.data = response.entities;
    // });
    this.ApiCallingService.getVehDashboard(FILTER_CONN + status).subscribe(vehList => {
      if (vehList.success)
        this.ApiCallingService.data = vehList.entities
      else
        this.ApiCallingService.data = null
    })
  }

}
