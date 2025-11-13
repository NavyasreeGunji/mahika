package com.shopping.controller;

import com.shopping.model.Order;
import com.shopping.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    @Autowired
    private OrderService service;
    
    @PostMapping
    public Order createOrder(@RequestBody Order order) {
        return service.createOrder(order);
    }
    
    @GetMapping("/email/{email}")
    public List<Order> getOrdersByEmail(@PathVariable String email) {
        return service.getOrdersByEmail(email);
    }
}
