package com.kuai.aop;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class UserServiceAspect {
    @Before(value="execution(* com.kuai.controller..*(..))")
    public void beforeAdvice(JoinPoint joinPoint) {
        System.out.println("Before UserServiceAspect >>>>>>");
    }

    @After(value="execution(* com.kuai.controller..*(..))")
    public void afterAdvice(JoinPoint joinPoint) {
        System.out.println("After UserServiceAspect >>>>>>");
    }
}
