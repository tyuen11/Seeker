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
        Boolean existsJob = jobRepository.selectExistsJob(job.getId()); // PERFORMANCE ISSUE? (https://stackoverflow.com/questions/11881479/how-do-i-update-an-entity-using-spring-data-jpa)

        if (existsJob) {
            throw new BadRequestException(
                    "Job " + job.getId() + " taken");
        }

        jobRepository.save(job);
    }

    public void deleteJob(Long id) {
        if (!jobRepository.existsById(id)) {
            throw new JobNotFoundException("Job with id " + id + " does not exist");
        }
        jobRepository.deleteById((id));
    }

    public void updateJob(Job job) {
        if (!jobRepository.selectExistsJob(job.getId())) {
            throw new JobNotFoundException("Job with id " + job.getId() + " does not exist");
        }
        jobRepository.save(job);
    }

}
