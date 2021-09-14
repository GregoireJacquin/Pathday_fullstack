package com.pathday.user;

import com.pathday.shared.GenericReponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/api/1.0/users")
    GenericReponse createUser(@Valid @RequestBody User user){
        userService.save(user);
        return new GenericReponse("User saved");
    }
}
