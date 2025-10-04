package com.demo.tracker_api.mapper;

import com.demo.tracker_api.dto.TaskRequestDTO;
import com.demo.tracker_api.entity.Task;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface TaskMapper {

    @Mapping(target = "id", ignore = true)
    Task toEntity(TaskRequestDTO dto);
}
