package com.pathday;

import com.pathday.user.User;
import com.pathday.user.UserRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@DataJpaTest
@ActiveProfiles("test")
public class UserRepositoryTest {

    @Autowired
    TestEntityManager testEntityManager;

    @Autowired
    UserRepository userRepository;

    @Test
    public void findByUsername_whenUserExists_returnUser(){
        testEntityManager.persist(TestUtil.createValidUser());
        User inDB = userRepository.findByUsername("test-user");
        assertThat(inDB).isNotNull();
    }
    @Test
    public void findByUsername_whenUserDoesNotExist_returnNull(){
        User inDB = userRepository.findByUsername("usernameNotExist");
        assertThat(inDB).isNull();
    }
}
