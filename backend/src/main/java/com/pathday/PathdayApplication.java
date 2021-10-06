package com.pathday;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication
public class PathdayApplication {

    public static void main(String[] args) {
        SpringApplication.run(PathdayApplication.class, args);
    }

}
