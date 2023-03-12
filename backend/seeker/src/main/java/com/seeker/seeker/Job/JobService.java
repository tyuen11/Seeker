package com.seeker.seeker.Job;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

import com.seeker.seeker.SeekerUser.exceptions.*;

@Service
public class JobService {

    @Autowired
    private JobRepository jobRepository;

    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    public Job getJob(Long id) {
        if (!jobRepository.existsById(id)) {
            throw new UserNotFoundException("Job with id " + id + " does not exist");
        }
        return jobRepository.findById((id)).get();
    
    }

    public void addJob(Job job) {
        Boolean existsJob = jobRepository.existsById(job.getId());

        if (existsJob) {
            throw new BadRequestException(
                    "Job " + job.getId() + " taken");
        }

        jobRepository.save(job);
    }

    public void deleteJob(Long id) {
        if (!jobRepository.existsById(id)) {
            throw new UserNotFoundException("Job with id " + id + " does not exist");
        }
        jobRepository.deleteById((id));
    }

}
