package com.seeker.seeker.CompanySearch;

import java.util.List;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class CompanySearchService {

    private final RestTemplate restTemplate;

    public CompanySearchService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public List<Company> searchCompanies(String company) {
        // String accessToken = "pk_4f6bf8af4188cb0028c44e5ad28775aa";
        
        String url = "https://autocomplete.clearbit.com/v1/companies/suggest?query=:" + company;
        HttpHeaders headers = new HttpHeaders();

        // Build the HTTP request entity
        HttpEntity<?> entity = new HttpEntity<>(headers);

        // Make the HTTP request
        ResponseEntity<List<Company>> responseEntity = restTemplate.exchange(
                url,
                HttpMethod.GET,
                entity,
                new ParameterizedTypeReference<List<Company>>() {}
        );

        if (responseEntity.getStatusCode() == HttpStatus.OK) {
            return responseEntity.getBody();
        } else {
            throw new RuntimeException("Failed to retrieve autocomplete data from Clearbit API.");
        }
    }
}
