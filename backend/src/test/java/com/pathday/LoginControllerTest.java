package com.pathday;

import com.pathday.error.ApiError;
import com.pathday.user.User;
import com.pathday.user.UserRepository;
import com.pathday.user.UserService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.support.BasicAuthenticationInterceptor;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import java.lang.reflect.Parameter;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class LoginControllerTest {
    private static final String API_1_0_LOGIN = "/api/1.0/login";

    @Autowired
    TestRestTemplate testRestTemplate;

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserService userService;

    @Before
    public void cleanup(){
        userRepository.deleteAll();
        testRestTemplate.getRestTemplate().getInterceptors().clear();
    }

    @Test
    public void postLogin_whitoutuserCredentials_receiveUnauthorized(){
        ResponseEntity<Object> response = login(Object.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.UNAUTHORIZED);
    }

    @Test
    public void postLogin_whitIncorrectCredentials_receiveUnauthorized(){
        authenticate();
        ResponseEntity<Object> response = login(Object.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.UNAUTHORIZED);
    }
    @Test
    public void postLogin_whitoutuserCredentials_receiveApiError(){
        ResponseEntity<ApiError> response = login(ApiError.class);
        assertThat(response.getBody().getUrl()).isEqualTo(API_1_0_LOGIN);
    }
    @Test
    public void postLogin_whitoutuserCredentials_receiveApiErrorWhitoutValidationErrors(){
        ResponseEntity<String > response = login(String.class);
        assertThat(response.getBody().contains("validationErrors")).isFalse();
    }
    @Test
    public void postLogin_whitIncorrectCredentials_receiveUnauthorizedWWWAuthentication(){
        authenticate();
        ResponseEntity<Object> response = login(Object.class);
        assertThat(response.getHeaders().containsKey("WWW-Authenticate")).isFalse();
    }
    @Test
    public void postLogin_withValideCredentials_receiveOK(){
        userService.save(TestUtil.createValidUser());
        authenticate();
        ResponseEntity<Object> response = login(Object.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }
    @Test
    public void postLogin_withValideCredentials_receiveLoggingInUserId(){
        User inDB = userService.save(TestUtil.createValidUser());
        authenticate();
        ResponseEntity<Map<String,Object>> response = login(new ParameterizedTypeReference<Map<String, Object>>() {});
        Map<String,Object> body = response.getBody();
        String image = (String)body.get("image");
        assertThat(image).isEqualTo(inDB.getImage());

    }
    @Test
    public void postLogin_withValideCredentials_receiveLoggingInUsersIMage(){
        User inDB = userService.save(TestUtil.createValidUser());
        authenticate();
        ResponseEntity<Map<String,Object>> response = login(new ParameterizedTypeReference<Map<String, Object>>() {});
        Map<String,Object> body = response.getBody();
        Integer id = (Integer)body.get("id");
        assertThat(id).isEqualTo(inDB.getId());

    }
    @Test
    public void postLogin_withValideCredentials_receiveLoggingInUsersDisplayName(){
        User inDB = userService.save(TestUtil.createValidUser());
        authenticate();
        ResponseEntity<Map<String,Object>> response = login(new ParameterizedTypeReference<Map<String, Object>>() {});
        Map<String,Object> body = response.getBody();
        String displayName = (String)body.get("displayName");
        assertThat(displayName).isEqualTo(inDB.getDisplayName());
    }
    @Test
    public void postLogin_withValideCredentials_receiveLoggingInUsersUsernameName(){
        User inDB = userService.save(TestUtil.createValidUser());
        authenticate();
        ResponseEntity<Map<String,Object>> response = login(new ParameterizedTypeReference<Map<String, Object>>() {});
        Map<String,Object> body = response.getBody();
        String username = (String)body.get("username");
        assertThat(username).isEqualTo(inDB.getUsername());
    }
    @Test
    public void postLogin_withValideCredentials_notReceiveLoggedInUsersPassword(){
        userService.save(TestUtil.createValidUser());
        authenticate();
        ResponseEntity<Map<String,Object>> response = login(new ParameterizedTypeReference<Map<String, Object>>() {});
        Map<String,Object> body = response.getBody();
        assertThat(body.containsKey("password")).isFalse();
    }
    private void authenticate() {
        testRestTemplate.getRestTemplate()
                .getInterceptors().add(new BasicAuthenticationInterceptor("test-user","P4ssword"));
    }

    public <T>ResponseEntity<T> login(Class<T> responseType){
        return testRestTemplate.postForEntity(API_1_0_LOGIN,null,responseType);
    }
    public <T>ResponseEntity<T> login(ParameterizedTypeReference<T> responseType){
        return testRestTemplate.exchange(API_1_0_LOGIN, HttpMethod.POST,null,responseType);
    }
}
