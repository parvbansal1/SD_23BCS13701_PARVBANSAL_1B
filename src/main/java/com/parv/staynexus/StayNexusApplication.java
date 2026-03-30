package com.parv.staynexus;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class StayNexusApplication {

	public static void main(String[] args) {
		SpringApplication.run(StayNexusApplication.class, args);
	}

}
