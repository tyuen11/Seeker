package com.seeker.seeker.SeekerUser;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.seeker.seeker.SeekerUser.exceptions.BadRequestException;
import com.seeker.seeker.SeekerUser.exceptions.UserNotFoundException;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class SeekerUserControllerTest {

    private MockMvc mockMvc;

    @Mock
    private SeekerUserService userService;

    @Autowired
    private SeekerUserRepository usersRepository;

    @InjectMocks
    private SeekerUserController userController;

    private static String asJsonString(Object object) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.writeValueAsString(object);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
    }

    @Test
    public void shouldGetUserSuccessfully() throws Exception {
        SeekerUser johnDoe = new SeekerUser(
                "John Doe",
                "john.doe@gmail.com");

        // Set the generated ID manually for the test
        johnDoe.setId(1L);

        when(userService.getUser(johnDoe.getId())).thenReturn(johnDoe);

        mockMvc.perform(post("/api/v1/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(johnDoe)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value(johnDoe.getEmail()))
                .andExpect(jsonPath("$.name").value(johnDoe.getName()));

        verify(userService, times(1)).getUser(johnDoe.getId());
        verifyNoMoreInteractions(userService);
    }

    @Test
    public void shouldReturnNotFoundWhenUserDoesNotExist() throws Exception {
        Long nonExistentUserId = 12345L;

        SeekerUser nonExistentUser = new SeekerUser();
        nonExistentUser.setId(nonExistentUserId);

        when(userService.getUser(nonExistentUserId)).thenThrow(UserNotFoundException.class);

        mockMvc.perform(post("/api/v1/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(nonExistentUser)))
                .andExpect(status().isNotFound());

        verify(userService, times(1)).getUser(nonExistentUserId);
        verifyNoMoreInteractions(userService);
    }

    /**
     * when(userService.addUser()): This syntax is used when you want to mock the
     * behavior of a specific method call. Here, addUser() is an instance method of
     * the userService object. By calling when(userService.addUser()), you are
     * instructing Mockito to mock the behavior of the addUser() method.
     * 
     * when(userService).addUser: This syntax is used when you want to mock the
     * behavior of the addUser() method itself, without specifying any arguments.
     * Here, addUser is treated as a method reference, referring to the addUser()
     * method of the userService object. By calling when(userService).addUser, you
     * are instructing Mockito to mock the behavior of the addUser() method without
     * considering any specific arguments.
     * 
     */
    @Test
    public void shouldAddUserSuccessfully() throws Exception {
        SeekerUser johnDoe = new SeekerUser(
                "John Doe",
                "john.doe@gmail.com");

        doThrow(BadRequestException.class).when(userService).addUser(johnDoe);

        mockMvc.perform(post("/api/v1/users/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(johnDoe)))
                .andExpect(status().isOk());

        verify(userService, times(1)).addUser(any(SeekerUser.class));
        verifyNoMoreInteractions(userService);
    }

    @Test
    public void shouldAddUserUnsuccessfully() throws Exception {
        SeekerUser johnDoe = new SeekerUser(
                "John Doe",
                "john.doe@gmail.com");

        usersRepository.save(johnDoe);

        doThrow(new BadRequestException("Email " + johnDoe.getEmail() + " taken")).when(userService).addUser(any(SeekerUser.class));

        mockMvc.perform(post("/api/v1/users/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(johnDoe)))
                .andExpect(status().isBadRequest());


        verify(userService, times(1)).addUser(any(SeekerUser.class));
        verifyNoMoreInteractions(userService);
    }

}
