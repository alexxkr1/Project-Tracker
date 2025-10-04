package com.demo.tracker_api.controller;

import com.demo.tracker_api.entity.Project;
import com.demo.tracker_api.service.ProjectService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {
    private final ProjectService service;
    public ProjectController(ProjectService service) { this.service = service; }

    @GetMapping
    public List<Project> getAll() { return service.findAll(); }

    @PostMapping
    public ResponseEntity<Project> createProject(@RequestBody Project project) {
        Project saved = service.createProject(project);
        return ResponseEntity.created(URI.create("/api/projects" + saved.getId())).body(saved);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Project> getProject(@PathVariable Long id) {
        return service.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
}
