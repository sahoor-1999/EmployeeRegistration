package com.hindujatech.employee.management.payload;

import com.hindujatech.employee.management.entity.User;
import lombok.Data;

@Data
public class JWTAuthResponse {

    private User user;
    private String tokenType;

    public JWTAuthResponse(User user, String tokenType) {
        this.user = user;
        this.tokenType = tokenType;

    }

}
