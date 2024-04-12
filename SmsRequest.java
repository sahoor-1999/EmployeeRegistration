package com.hindujatech.employee.management.payload;

import lombok.Data;

@Data
public class SmsRequest {
    private String to;
    private String message;
}
