package com.seeker.seeker.Job;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


@RestController
@RequestMapping(path = "api/v1/jobs")
@CrossOrigin(origins = "*", maxAge = 3600)
public class JobController {
    @Autowired
    private JobService jobService;

    @PostMapping()
    public Job getJob(Long id) {
        return jobService.getJob(id);
    }

    @PostMapping(value="/add")
    public void addJob(@Valid @RequestBody Job job) {
        System.out.println(job);
        jobService.addJob(job);
    }
}
