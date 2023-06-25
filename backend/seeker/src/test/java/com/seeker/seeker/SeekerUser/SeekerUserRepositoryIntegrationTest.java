package com.seeker.seeker.SeekerUser;


import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(SpringExtension.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class SeekerUserRepositoryIntegrationTest {
    
    @Autowired
    private SeekerUserRepository users;

    @AfterEach
    public void tearDown() throws Exception {
        users.deleteAll();
    }

    @Test
    public void shouldSaveAndGetUserExistByEmail() throws Exception {
        SeekerUser johnDoe = new SeekerUser(
                    "John Doe",
                    "john.doe@gmail.com");
        users.save(johnDoe);

        var johnDoeExists = users.selectExistsEmail("john.doe@gmail.com");
        assertThat(johnDoeExists).isTrue();
    }
}