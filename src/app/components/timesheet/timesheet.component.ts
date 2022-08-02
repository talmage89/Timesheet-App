import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Department } from 'src/app/interfaces/department';
import { Employee } from 'src/app/interfaces/employee';
import { DepartmentsService } from 'src/app/services/departments.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss']
})
export class TimesheetComponent implements OnInit {
  $departments: Observable<Department[]> | undefined;
  department: Department | undefined;
  employeeNameFC = new FormControl('', this.nameValidator());
  employees: Employee[] = [];
  employeeId = 0;
  weekdays: string[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private departmentsService: DepartmentsService,
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    this.$departments = this.departmentsService.getDepartments();

    this.$departments.subscribe(x => {
      this.department = x.find(department => department.id === this.route.snapshot.params['id']);
    })
  }

  addEmployee(): void {
    if (this.employeeNameFC.value) {
      this.employeeId++;

      this.employees.push({
        departmentId: this.department?.id,
        name: this.employeeNameFC.value,
        payRate: Math.floor(Math.random() * 50) + 50,
        monday: 0,
        tuesday: 0,
        wednesday: 0,
        thursday: 0,
        friday: 0,
        saturday: 0,
        sunday: 0
      })

      this.employeeNameFC.setValue('');
    }
  }

  nameValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let error = null;
      if (this.employees && this.employees.length) {
        this.employees.forEach(employee => {
          if (employee.name.toLocaleLowerCase() === control.value.toLocaleLowerCase()) {
            error = { duplicate: true };
          }
        })
      }
      return error;
    }
  }

  getTotalHours(employee: Employee): number {
    return employee.monday + employee.tuesday + employee.wednesday + employee.thursday +
      employee.friday + employee.saturday + employee.sunday;
  }

  deleteEmployee(index: number): void {
    this.employees.splice(index, 1);
  }

  submit(): void {
    this.employees.forEach(employee => {
      this.employeeService.saveEmployeeHours(employee);
    })

    this.router.navigate(['/departments']);
  }

}
