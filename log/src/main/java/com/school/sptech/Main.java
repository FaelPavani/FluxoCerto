package com.school.sptech;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class Main {
    public static void main(String[] args) {
        LocalDate today = LocalDate.now();
        LocalDate data = LocalDate.of(2018, 1, 1);
        LocalDate dataString = LocalDate.parse("2018-01-01");
        LocalDateTime dataHota = today.atTime(11, 40, 50, 10);
        System.out.println(today);
        System.out.println(dataHota);
    }
}