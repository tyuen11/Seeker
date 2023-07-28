package com.seeker.seeker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.client.RestTemplate;


@SpringBootApplication
@EntityScan("com.seeker.seeker.*")
@EnableJpaRepositories("com.seeker.seeker.*")
public class SeekerApplication {

	public static void main(String[] args) {
		SpringApplication.run(SeekerApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
	   return new WebMvcConfigurer() {
		  @Override
		  public void addCorsMappings(CorsRegistry registry) {
			 registry.addMapping("/api/v1/users").allowedOrigins("http://localhost:8080");
		  }
	   };
	}
	@Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

}
