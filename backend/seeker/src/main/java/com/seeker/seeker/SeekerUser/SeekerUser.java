package com.seeker.seeker.SeekerUser;
 
import org.springframework.beans.factory.annotation.Value;

import jakarta.persistence.*;


@Entity 
@Table
public class SeekerUser {
	
	@SequenceGenerator(
		name = "seekeruser_sequence",
		sequenceName = "seekeruser_sequence",
		allocationSize = 1
	)
	@GeneratedValue(
		strategy = GenerationType.SEQUENCE,
		generator = "seekeruser_sequence"
	)
	@Id
	private Long id;
    private String name;
    private String email;
	
	@Value("${containers:{}}")
	private String[] containers;


	public SeekerUser() { super(); }
    
    public SeekerUser(String name, String email) {
		this.name = name;
		this.email = email;
	}

	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}

	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String[] getContainers() {
		return containers;
	}

	public void setContainers(String[] containers) {
		this.containers = containers;
	}

	@Override
	public String toString() {
		return "Id [id=" + id + "]" + " " + 
		"User [name=" + name + "]" + " " + 
		"Email [email=" + email + "]" + " ";
	}
}
