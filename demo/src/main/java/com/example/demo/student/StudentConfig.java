package com.example.demo.student;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.util.List;

@Configuration
public class StudentConfig {

    @Bean
    CommandLineRunner commandLineRunner(StudentRepository repository) {
        return args -> {
           Student mariam = new Student(
                               "Mariam",
                               "Mariam@gmail.com",
                   LocalDate.of(2004, 3, 17)
                       );

            Student alex = new Student(
                                "Alex",
                                "alex@gmail.com",
                    LocalDate.of(2005, 3, 17)
                        );

            repository.saveAll(
                    List.of(mariam, alex)
            );
        };
    }
}
