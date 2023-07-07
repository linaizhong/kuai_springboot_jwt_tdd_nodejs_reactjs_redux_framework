package com.kuai;

import com.kuai.model.Role;
import com.kuai.model.RoleName;
import com.kuai.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
class Initializer implements CommandLineRunner {
    @Autowired
    RoleRepository roleRepository;

    @Override
    public void run(String... strings) {
        if(roleRepository.findAll() == null || roleRepository.findAll().isEmpty()) {
            roleRepository.save(new Role(RoleName.ROLE_ADMIN));
            roleRepository.save(new Role(RoleName.ROLE_PM));
            roleRepository.save(new Role(RoleName.ROLE_USER));

            roleRepository.findAll().forEach(System.out::println);
        }
    }
}