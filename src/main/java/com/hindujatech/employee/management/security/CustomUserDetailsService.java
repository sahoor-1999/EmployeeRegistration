package com.hindujatech.employee.management.security;


import com.hindujatech.employee.management.entity.Role;
import com.hindujatech.employee.management.entity.User;
import com.hindujatech.employee.management.repository.UserRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    private UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String usernameorEmail) throws UsernameNotFoundException {
        User user = userRepository.findByUsernameOrEmail(usernameorEmail, usernameorEmail).orElseThrow(
                () -> new UsernameNotFoundException("User not found with username or email - " + usernameorEmail)
        );
        if(user != null){
            return new org.springframework.security.core.userdetails.User(
                    user.getEmail(),
                    user.getPassword(),
                    mapRolesToAuthorities(user));
        }else {
            throw new UsernameNotFoundException("User not found with username: " + usernameorEmail);
        }

    }

    private Collection<? extends GrantedAuthority> mapRolesToAuthorities(User user){
        Set<SimpleGrantedAuthority> authorities = new HashSet<>();
        user.getRoles().forEach(role -> {
            authorities.add(new SimpleGrantedAuthority (role.getName()));
        });
        return authorities;
    }
}
