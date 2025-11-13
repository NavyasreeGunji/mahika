package com.shopping.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String productName;
    private String category;
    private Integer price;
    private Integer quantity;
    
    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;
}
