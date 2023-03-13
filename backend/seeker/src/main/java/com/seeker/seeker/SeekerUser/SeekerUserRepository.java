package com.seeker.seeker.SeekerUser;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface SeekerUserRepository extends JpaRepository<SeekerUser, Long> {

    @Query("" +
            "SELECT CASE WHEN COUNT(s) > 0 THEN " +
            "TRUE ELSE FALSE END " +
            "FROM SeekerUser s " +
            "WHERE s.email = ?1"
    )
    Boolean selectExistsEmail(String email);

}

