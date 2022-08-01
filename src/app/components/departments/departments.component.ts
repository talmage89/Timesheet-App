import { Component, OnInit } from '@angular/core';
import { DepartmentsService } from 'src/app/services/departments.service';
import { Department } from 'src/app/interfaces/department';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit {
  departments: Department[] | undefined;

  constructor(
    private departmentsService: DepartmentsService
  ) {
    this.departments = this.departmentsService.departments;
  }

  ngOnInit(): void {

  }

}
