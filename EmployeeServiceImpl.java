package com.hindujatech.employee.management.service.impl;

import com.hindujatech.employee.management.entity.Employee;
import com.hindujatech.employee.management.exception.ResourceNotFoundException;
import com.hindujatech.employee.management.repository.EmployeeRepository;
import com.hindujatech.employee.management.service.EmployeeService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

@Service
public class EmployeeServiceImpl implements EmployeeService {
    private ModelMapper modelMapper;
    private EmployeeRepository employeeRepository;

    @Value("${twilio.accountSid}")
    private String accountSID;
    @Value("${twilio.authToken}")
    private String authToken;
    @Value("${twilio.phoneNumber}")
    private String phoneNumber;

    public EmployeeServiceImpl(ModelMapper modelMapper, EmployeeRepository employeeRepository) {
        this.modelMapper = modelMapper;
        this.employeeRepository = employeeRepository;
    }

    @Override
    public void saveEmployee(Employee employee, String message) {
        String mobile = employee.getMobile();
        boolean b = validateNumber(mobile);
        if(b == true) {
            Employee save = employeeRepository.save(employee);
            if (save != null){
                sendSMS("+91-"+save.getMobile(), message);
                }
            }
        else
            throw new ResourceNotFoundException("Mobile Number is not valid.");
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

    @Override
    public void sendSMS(String to, String message) {
    Twilio.init(accountSID, authToken);
    Message.creator(new PhoneNumber(to), new PhoneNumber(phoneNumber), message).create();
    }

    public static boolean validateNumber(String mobileNumber){
        String regex = "^[0-9]*";
        Pattern compile = Pattern.compile(regex);
        Matcher matcher = compile.matcher(mobileNumber);
        return matcher.matches();
    }
}
