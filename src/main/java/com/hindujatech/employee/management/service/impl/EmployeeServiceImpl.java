package com.hindujatech.employee.management.service.impl;

import com.hindujatech.employee.management.entity.Employee;
import com.hindujatech.employee.management.exception.ResourceNotFoundException;
import com.hindujatech.employee.management.repository.EmployeeRepository;
import com.hindujatech.employee.management.service.EmployeeService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class EmployeeServiceImpl implements EmployeeService {
    private ModelMapper modelMapper;
    private EmployeeRepository employeeRepository;

    public EmployeeServiceImpl(ModelMapper modelMapper, EmployeeRepository employeeRepository) {
        this.modelMapper = modelMapper;
        this.employeeRepository = employeeRepository;
    }

    @Override
    public Employee saveEmployee(Employee employee) {
        Employee save = employeeRepository.save(employee);
        return save;
    }

    @Override
    public void deleteEmployee(Long id) {
        employeeRepository.findById(id).orElseThrow(
                ()-> new ResourceNotFoundException("Employee details not present with id - " + id)
        );
        employeeRepository.deleteById(id);
    }

    @Override
    public List<Employee> getAllEmployee() {
        List<Employee> all = employeeRepository.findAll();
        return all;
    }

    @Override
    public Employee getEmployeeById(Long id) {

        Employee emploeeRecord = employeeRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Record Not Found")
        );
        return emploeeRecord;
    }

    @Override
    public Employee updateEmployee(Employee employee) {
        Employee save = employeeRepository.save(employee);
        return save;
    }
}
