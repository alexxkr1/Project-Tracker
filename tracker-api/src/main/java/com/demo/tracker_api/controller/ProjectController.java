package com.demo.tracker_api.controller;

import com.demo.tracker_api.dto.ProjectRequestDTO;
import com.demo.tracker_api.entity.Project;
import com.demo.tracker_api.mapper.ProjectMapper;
import com.demo.tracker_api.service.ProjectService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/projects")
@Tag(name = "Projects", description = "Operations for creating and retrieving projects.")
public class ProjectController {
    private final ProjectService service;
    private final ProjectMapper mapper;
    public ProjectController(ProjectService service, ProjectMapper mapper) {
        this.service = service;
        this.mapper = mapper;
    }

    @Operation(summary = "Get all projects")
    @GetMapping
    public List<Project> getAll() { return service.findAll(); }

    @Operation(
            summary = "Create a new project",
            responses = {
                    @ApiResponse(responseCode = "201", description = "Project successfully created"),
                    @ApiResponse(responseCode = "400", description = "Invalid project details")
            }
    )
    @PostMapping
    public ResponseEntity<Project> createProject(@Valid @RequestBody ProjectRequestDTO dto) {
        Project newProject = mapper.toEntity(dto);
        Project saved = service.createProject(newProject);
        return ResponseEntity.created(URI.create("/api/projects" + saved.getId())).body(saved);
    }

    @Operation(
            summary = "Get a project by ID",
            responses = {
                @ApiResponse(responseCode = "200", description = "Project successfully found"),
                @ApiResponse(responseCode = "404", description = "Project not found")
        }
    )
    @GetMapping("/{id}")
    public ResponseEntity<Project> getProject(@PathVariable Long id) {
        return service.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
}
