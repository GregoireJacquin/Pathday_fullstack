package com.pathday.user;

import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class UniqueUsernameValidator implements ConstraintValidator<UniqueUsername, String> {
   @Autowired
   UserRepository userRepository;

   public boolean isValid(String obj, ConstraintValidatorContext context) {
      User inDB = userRepository.findByUsername(obj);
      if(inDB == null){
         return true;
      }
      return false;
   }
}
