package com.seeker.seeker.Job;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.seeker.seeker.Job.exceptions.*;
import com.seeker.seeker.SeekerUser.exceptions.*;

@Service
public class JobService {

    @Autowired
    private JobRepository jobRepository;

    public Job getJob(Long id) {
        if (!jobRepository.selectExistsJob(id)) {
            throw new JobNotFoundException("Job with id " + id + " does not exist");
        }
        return jobRepository.findById((id)).get();
    
    }

    public Job[] getJobs(Long uid) {
        return jobRepository.selectUserJobs(uid);
    }

    public void addJob(Job job) {
        Boolean existsJob = jobRepository.selectExistsJob(job.getId());

        if (existsJob) {
            throw new BadRequestException(
                    "Job " + job.getId() + " taken");
        }

        jobRepository.save(job);
    }

    public void editJob(Long id, String attribute) {
        if (!jobRepository.selectExistsJob(id)) {
            throw new JobNotFoundException("Job with id " + id + " does not exist");
        }
        
    }

    public void deleteJob(Long id) {
        if (!jobRepository.existsById(id)) {
            throw new JobNotFoundException("Job with id " + id + " does not exist");
        }
        jobRepository.deleteById((id));
    }

}
