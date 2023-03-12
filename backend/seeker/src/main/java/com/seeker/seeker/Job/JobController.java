package com.seeker.seeker.Job;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

import javax.validation.Valid;


@RestController
@RequestMapping(path = "api/v1/jobs")
public class JobController {
    @Autowired
    private JobService jobService;

    @GetMapping
    public List<Job> getAllJobs() {
        return jobService.getAllJobs();
    }

    @GetMapping
    public Job getJob(Long id) {
        return jobService.getJob(id);
    }

    @PostMapping
    public void addJob(@Valid @RequestBody Job job) {
        jobService.addJob(job);
    }
}
