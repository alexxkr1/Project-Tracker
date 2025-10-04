package com.demo.tracker_api.controller;

import com.demo.tracker_api.entity.Task;
import com.demo.tracker_api.service.TaskService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/api/tasks")
@Tag(name = "Tasks", description = "Operations for creating and updating tasks.")
public class TaskController {
    private final TaskService service;
    public TaskController(TaskService service) { this.service = service; }

    @Operation(summary = "Create new task for project")
    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        Task saved = service.save(task);

        return ResponseEntity.created(URI.create("/api/task" + saved.getId())).body(saved);
    }

    @Operation(summary = "Update task status")
    @PutMapping("/{id}")
    public ResponseEntity<Task> updateStatus(@PathVariable Long id, @RequestBody Task payload) {
        return service.findById(id).map(existing -> {
            existing.setStatus(payload.getStatus());

            return ResponseEntity.ok(service.save(existing));
        }).orElse(ResponseEntity.notFound().build());
    }
}
