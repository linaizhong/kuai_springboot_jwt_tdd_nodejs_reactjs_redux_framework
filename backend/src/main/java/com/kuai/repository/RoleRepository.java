package com.kuai.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kuai.model.Role;
import com.kuai.model.RoleName;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    @Override
    List<Role> findAll();

    Optional<Role> findByName(RoleName roleName);
}