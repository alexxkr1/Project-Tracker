package com.demo.tracker_api.service;

import com.demo.tracker_api.entity.Project;
import com.demo.tracker_api.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {
    private final ProjectRepository repo;
    public ProjectService(ProjectRepository repo) { this.repo = repo; }


    public List<Project> findAll() { return repo.findAll(); }
    public Project createProject(Project p) { return repo.save(p); }
    public Optional<Project> findById(Long id) { return repo.findById(id); }
}
