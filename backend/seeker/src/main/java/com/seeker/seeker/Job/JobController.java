package com.seeker.seeker.Job;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.HashMap;
import java.util.Map;

import javax.validation.Valid;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping(path = "api/v1/jobs")
@CrossOrigin(origins = "*", maxAge = 3600)
public class JobController {
    @Autowired
    private JobService jobService;
    ObjectMapper mapper = new ObjectMapper();

    @PostMapping()
    public Job getJob(Long id) {
        return jobService.getJob(id);
    }

    @PostMapping(value = "/add")
    @ResponseStatus(HttpStatus.OK)
    public String addJob(@Valid @RequestBody Job job) throws JsonProcessingException {
        // Response res = new Response(true, null, "Adding job was successful");
        Map<String, Object> res = new HashMap<>();
        res.put("success", true);
        res.put("data", null);
        res.put("message", "Adding job was successful");

        return mapper.writeValueAsString(res);
    }

    @PostMapping(value = "/all")
    public String getJobs(@Valid @RequestParam(name = "uid") Long uid) throws JsonProcessingException {
        Map<String, Object> res = new HashMap<>();
        res.put("success", true);
        res.put("data", jobService.getJobs((uid)));
        res.put("message", "Getting job was successful");
        return mapper.writeValueAsString(res);

    }

    @PostMapping(value = "/delete")
    public String removeJob(@Valid @RequestParam(name = "id") Long id) throws JsonProcessingException {
        jobService.deleteJob(id);
        Map<String, Object> res = new HashMap<>();
        res.put("success", true);
        res.put("data", null);
        res.put("message", "Deleting job was successful");

        return mapper.writeValueAsString(res);
        
    }
}
