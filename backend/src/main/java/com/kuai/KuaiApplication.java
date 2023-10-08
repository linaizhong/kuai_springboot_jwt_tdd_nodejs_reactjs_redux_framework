package com.kuai;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@EnableSwagger2
@EnableAspectJAutoProxy(proxyTargetClass = true)
public class KuaiApplication {
	public static void main(String[] args) {
		ApplicationContext ac = SpringApplication.run(KuaiApplication.class, args);
		System.out.println("text");
	}
}
