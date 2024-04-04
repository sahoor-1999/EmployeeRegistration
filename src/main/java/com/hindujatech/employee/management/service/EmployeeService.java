package com.hindujatech.employee.management.service;

import com.hindujatech.employee.management.entity.Employee;

import java.util.List;

public interface EmployeeService {
    Employee saveEmployee(Employee employee);
    void deleteEmployee(Long id);
    List<Employee> getAllEmployee();
    Employee getEmployeeById(Long id);
    Employee updateEmployee(Employee employee);
}
