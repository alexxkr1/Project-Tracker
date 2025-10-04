package com.demo.tracker_api.dto;

import com.demo.tracker_api.enums.TaskStatus;
import jakarta.annotation.Nullable;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

public record TaskRequestDTO (
    @NotBlank(message = "Title is required")
    String title,

    @Nullable
    @Size(max = 255, message = "Description cannot exceed 255 characters.")
    String description,

    @NotNull(message = "Start date is required.")
    @FutureOrPresent(message = "Start date cannot be in the past.")
    LocalDateTime dueDate,

    @Nullable
    TaskStatus status,

    @NotNull( message = "Project ID is required.")
    Long project_id
) {}
