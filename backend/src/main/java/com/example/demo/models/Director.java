package com.example.demo.models;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "director")
public class Director {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private String name;

    private String nationality;

    private double age;

    public Director(Long id, String name, String nationality, double age) {
        this.id = id;
        this.name = name;
        this.nationality = nationality;
        this.age = age;
    }

    public Director(String name, String nationality, double age) {
        this.name = name;
        this.nationality = nationality;
        this.age = age;
    }

    public Director() {
        // Konstruktor bezargumentowy
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNationality() {
        return nationality;
    }

    public void setNationality(String nationality) {
        this.nationality = nationality;
    }

    public double getAge() {
        return age;
    }

    public void setAge(double age) {
        this.age = age;
    }
}
