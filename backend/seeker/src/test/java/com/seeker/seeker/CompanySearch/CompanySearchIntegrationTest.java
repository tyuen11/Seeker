package com.seeker.seeker.CompanySearch;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@ExtendWith(SpringExtension.class)
@DataJpaTest
@Import(CompanySearchService.class) // Add the CompanySearchService as a bean

public class CompanySearchIntegrationTest {


    @Autowired
    private CompanySearchService companySearchService;

    @Test
    public void shouldGetCompaniesSuccess() {
        // Create a mock of the RestTemplate (the external API client)
        RestTemplate restTemplateMock = mock(RestTemplate.class);

        // Read the JSON string from the field and deserialize it into a list of Company
        // objects
        ObjectMapper objectMapper = new ObjectMapper();
        List<Company> mockCompaniesRes = new ArrayList<Company>();

        try {
            // Load the JSON data from the file
            InputStream inputStream = getClass().getClassLoader().getResourceAsStream("data/response.json");
            mockCompaniesRes = objectMapper.readValue(inputStream, new TypeReference<List<Company>>() {});

        } catch (IOException e) {
            // Might be unreliable to have try-catch block 
            // (https://stackoverflow.com/questions/31423643/try-catch-in-a-junit-test) 
            e.printStackTrace(); 
        }

            // Configure the mock service URL
            String baseUrl = "http://localhost:8080";
            String endpoint = "/v1/companies/search";
            String queryParam = "company=";
            String inputCompany = "goog";

            // Set up the mock to return the expected response when calling the external API
            when(restTemplateMock.getForObject(baseUrl + endpoint + "?" + queryParam + inputCompany, List.class))
                    .thenReturn(mockCompaniesRes);

            // Create the instance of CompanySearchService using the mock RestTemplate

            // Perform the actual API call to the consumer's endpoint
            List<Company> companiesRes = companySearchService.searchCompanies(inputCompany);


            assertThat(companiesRes).isNotNull();
            assertThat(companiesRes).hasSize(5);

            for (int x=0; x<5; x++) {
                assertThat(companiesRes.get(x)).usingRecursiveComparison().isEqualTo(mockCompaniesRes.get(x));
            }
         
    }

}
