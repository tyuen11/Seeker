package com.seeker.seeker.Job;

import java.util.Date;

import jakarta.persistence.*;


@Entity 
@Table
public class Job {
    @SequenceGenerator(
		name = "jobs_sequence",
		sequenceName = "jobs_sequence",
		allocationSize = 1
	)
	@GeneratedValue(
		strategy = GenerationType.SEQUENCE,
		generator = "jobs_sequence"
	)
	@Id
    private Long id;
    private String companyName;
    private String position;
    private Date dateApplied;
    private String status;
    private String container;

    public Job(){ super(); }

    public Job(String companyName, String position, Date dateApplied, String status, String container) {
        this.companyName = companyName;
        this.position = position;
        this.dateApplied = dateApplied;
        this.status = status;
        this.container = container;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public Date getDateApplied() {
        return dateApplied;
    }

    public void setDateApplied(Date dateApplied) {
        this.dateApplied = dateApplied;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getContainer() {
        return container;
    }

    public void setContainer(String container) {
        this.container = container;
    }
}
