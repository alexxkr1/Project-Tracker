package com.demo.tracker_api.mapper;

import com.demo.tracker_api.dto.ProjectRequestDTO;
import com.demo.tracker_api.entity.Project;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ProjectMapper {

    @Mapping(target = "id", ignore = true)
    Project toEntity(ProjectRequestDTO dto);
}
