package com.demo.tracker_api.repository;

import com.demo.tracker_api.entity.Task;
import com.demo.tracker_api.enums.TaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByStatus(TaskStatus status);
}