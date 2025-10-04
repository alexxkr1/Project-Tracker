package com.demo.tracker_api.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.demo.tracker_api.dto.ProjectRequestDTO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.time.LocalDateTime;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class ProjectControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    private ProjectRequestDTO createValidDto() {
        return new ProjectRequestDTO(
                "Successful Project",
                "A test description",
                LocalDateTime.now().plusDays(1),
                null
        );
    }

    @Test
    void createProject_StartDateInPast_ShouldReturn400BadRequest() throws Exception {
        // Checking if violating @FutureOrPresent works
        ProjectRequestDTO invalidDto = new ProjectRequestDTO(
                "Past Project",
                "A valid description",
                LocalDateTime.now().minusDays(1),
                null
        );

        mockMvc.perform(post("/api/projects")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidDto)))
                .andExpect(status().isBadRequest())
                .andExpect(MockMvcResultMatchers.jsonPath("$.errors.startDate").exists());
    }


    @Test
    void createProject_MissingName_ShouldReturn400BadRequest() throws Exception {
        // Title cannot be blank.
        ProjectRequestDTO invalidDto = new ProjectRequestDTO(
                "", // Fails @NotBlank
                "A valid description",
                LocalDateTime.now().plusDays(1),
                null
        );

        mockMvc.perform(post("/api/projects")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidDto)))
                .andExpect(status().isBadRequest())
                .andExpect(MockMvcResultMatchers.jsonPath("$.errors.name").exists());
    }
}