package com.demo.tracker_api.service;

import com.demo.tracker_api.entity.Task;
import com.demo.tracker_api.enums.TaskStatus;
import com.demo.tracker_api.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TaskService {
    private final TaskRepository repo;
    public TaskService(TaskRepository repo) { this.repo = repo; }

    public Optional<Task> findById(Long id) { return repo.findById(id); }
    public Task save(Task t) {
        if (t.getStatus() == null) {
            t.setStatus(TaskStatus.TODO);
        }

        return repo.save(t); }
}
