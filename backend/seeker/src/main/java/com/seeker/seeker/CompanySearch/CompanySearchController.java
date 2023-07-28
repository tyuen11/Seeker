package com.seeker.seeker.CompanySearch;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)

public class CompanySearchController {

    private final CompanySearchService companySearchService;

    @Autowired
    public CompanySearchController(CompanySearchService companySearchService) {
        this.companySearchService = companySearchService;
    }

    @GetMapping("/companies/search")
    public List<Company> searchCompanies(@RequestParam("company") String company) {
        return companySearchService.searchCompanies(company);
    }
}
