package com.seeker.seeker.Job;

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
    private String dateApplied;
    private String status;
    private String url;
    private Long userId;
    private String dateModified;
    private String lexorank;
    private String companySite;
    public Job(){ super(); }

    public Job(
        String companyName, 
        String position, 
        String status, 
        String url, 
        String dateApplied, 
        String dateModified,
        String lexorank,
        String companySite
    ) {
        this.companyName = companyName;
        this.position = position;
        this.status = status;
        this.dateApplied = dateApplied;
        this.url = url;
        this.dateModified = dateModified;
        this.lexorank = lexorank;
        this.companySite = companySite;
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

    public String getDateApplied() {
        return dateApplied;
    }

    public void setDateApplied(String dateApplied) {
        this.dateApplied = dateApplied;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Long getUserId() {
        return userId;
    }
    
    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getDateModified() {
        return dateModified;
    }

    public void setDateModified(String dateModified) {
        this.dateModified = dateModified;
    }

    public String getLexorank() {
        return lexorank;
    }

    public void setLexorank(String lexorank) {
        this.lexorank = lexorank;
    }

    public String getCompanySite() {
        return companySite;
    }

    public void setCompanySite(String companySite) {
        this.companySite = companySite;
    }

}
