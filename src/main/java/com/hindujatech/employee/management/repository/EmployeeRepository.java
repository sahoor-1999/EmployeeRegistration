package com.hindujatech.employee.management.repository;

import com.hindujatech.employee.management.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}
