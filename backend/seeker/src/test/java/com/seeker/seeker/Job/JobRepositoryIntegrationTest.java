package com.seeker.seeker.Job;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
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
public class JobRepositoryIntegrationTest {

    @Autowired
    private JobRepository jobRepository;
    private Job testJob;

    @BeforeEach
    public void setUp() {
        testJob = new Job(
                "Company XYZ",
                "Software Engineer",
                "Applied",
                "https://example.com",
                "2023-06-24",
                "2023-06-24",
                "A1");
        jobRepository.save(testJob);
    }

    @AfterEach
    public void tearDown() throws Exception {
        jobRepository.deleteAll();
    }

    @Test
    public void shouldSaveAndGetJobExistById() throws Exception {
        Boolean exists = jobRepository.selectExistsJob(testJob.getId());
        assertThat(exists).isTrue();

    }
    
}