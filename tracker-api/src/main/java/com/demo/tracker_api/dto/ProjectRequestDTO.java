package com.demo.tracker_api.dto;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

public record ProjectRequestDTO (
    @NotBlank
    String name,

    @Size(max = 255)
    String description,

    @NotNull(message = "Start date is required.")
    @FutureOrPresent(message = "Start date cannot be in the past.")
    LocalDateTime startDate,

    LocalDateTime endDate
) {}
