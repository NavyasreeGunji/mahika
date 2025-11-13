package com.shopping.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String category;
    private Double price;
    private Integer stock;
    private String imageUrl;
    
    @Column(length = 500)
    private String sizes;
    
    @Column(length = 10000)
    private String images;
}
