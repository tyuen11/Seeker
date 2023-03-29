package com.seeker.seeker.Job;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {

    @Query("" +
        "SELECT CASE WHEN COUNT(s) > 0 THEN " +
        "TRUE ELSE FALSE END " +
        "FROM Job s " +
        "WHERE s.id = ?1"
    )
    Boolean selectExistsJob(Long id);

    @Query("SELECT j FROM Job j WHERE j.userId = ?1")
    Job[] selectUserJobs(Long uid);

}
