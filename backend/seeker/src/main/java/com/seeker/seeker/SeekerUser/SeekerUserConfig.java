package com.seeker.seeker.SeekerUser;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SeekerUserConfig {

    @Bean
    CommandLineRunner commandLineRunner(SeekerUserRepository repo) {
        return args -> {
            // SeekerUser user = new SeekerUser(
            //         "Test Testt",
            //         "test.testt@gmail.com");
            // repo.save(user);
        };
    }

}
