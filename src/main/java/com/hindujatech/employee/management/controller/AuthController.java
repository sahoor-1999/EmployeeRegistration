package com.hindujatech.employee.management.controller;

import com.hindujatech.employee.management.entity.Role;
import com.hindujatech.employee.management.entity.User;
import com.hindujatech.employee.management.payload.JWTAuthResponse;
import com.hindujatech.employee.management.payload.LoginDTO;
import com.hindujatech.employee.management.payload.SignUpDTO;
import com.hindujatech.employee.management.repository.RoleRepository;
import com.hindujatech.employee.management.repository.UserRepository;
import com.hindujatech.employee.management.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.Optional;


@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtTokenProvider tokenProvider;

    //http://localhost:8080/api/auth/signin
    @PostMapping("/signin")
    public JWTAuthResponse authenticateUser(@RequestBody LoginDTO loginDTO){
        String username = loginDTO.getUsernameOrEmail();
        String password = loginDTO.getPassword();

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDTO.getUsernameOrEmail(), loginDTO.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = tokenProvider.generateToken(authentication);
        User user = userRepository.findByUsername(username).get();
        return new JWTAuthResponse(user, token);

    }
    //http://localhost:8080/api/auth/signup
    @PostMapping("/signup")
    public ResponseEntity<String> registerUser(@RequestBody SignUpDTO signUpDTO){
        if(userRepository.existsByUsername(signUpDTO.getUsername())){
            return new ResponseEntity<>("Username is already taken!", HttpStatus.BAD_REQUEST);
        }
        if(userRepository.existsByEmail(signUpDTO.getEmail())){
            return new ResponseEntity<>("Email is already taken", HttpStatus.BAD_REQUEST);
        }

        User user = new User();
        user.setName(signUpDTO.getName());
        user.setUsername(signUpDTO.getUsername());
        user.setEmail(signUpDTO.getEmail());
        user.setPassword(passwordEncoder.encode(signUpDTO.getPassword()));

        Role roles = roleRepository.findByName("ROLE_ADMIN").get();
        user.setRoles(Collections.singleton(roles));

        userRepository.save(user);

        return new ResponseEntity<>("User Sign-up successfully!", HttpStatus.CREATED);
    }

}
