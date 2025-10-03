package com.demo.tracker_api.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.Set;

@Table(name = "projects")
@Entity
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private LocalDateTime startDate;

    private LocalDateTime endDate;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Task> tasks;

}
