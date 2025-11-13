package com.shopping.service;

import com.shopping.model.Order;
import com.shopping.model.OrderItem;
import com.shopping.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {
    @Autowired
    private OrderRepository repository;
    
    public Order createOrder(Order order) {
        order.setOrderDate(LocalDateTime.now());
        order.setStatus("Completed");
        for (OrderItem item : order.getItems()) {
            item.setOrder(order);
        }
        return repository.save(order);
    }
    
    public List<Order> getOrdersByEmail(String email) {
        return repository.findByCustomerEmailOrderByOrderDateDesc(email);
    }
}
