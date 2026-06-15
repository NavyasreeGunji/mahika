package com.shopping.service;

import com.shopping.model.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String toEmail;

    public String sendTestEmail() {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(toEmail);
            message.setSubject("Mahika Email Test ✓");
            message.setText("Email service is working correctly.\n\n— Mahika Designer Studio");
            mailSender.send(message);
            return "Email sent successfully to " + toEmail;
        } catch (Exception e) {
            return "Email failed: " + e.getMessage();
        }
    }

    public void sendOrderNotification(Order order) {
        try {
            StringBuilder items = new StringBuilder();
            if (order.getItems() != null) {
                for (var item : order.getItems()) {
                    items.append("  - ").append(item.getProductName())
                         .append(" x").append(item.getQuantity())
                         .append(" — ₹").append(item.getPrice() * item.getQuantity())
                         .append("\n");
                }
            }

            String body = "New Order Received!\n\n" +
                "Order ID   : #" + order.getId() + "\n" +
                "Customer   : " + order.getCustomerName() + "\n" +
                "Email      : " + order.getCustomerEmail() + "\n" +
                "Payment    : " + order.getPaymentMethod() + " | UPI: " + order.getUpiId() + "\n\n" +
                "Items:\n" + items +
                "\nTotal: ₹" + order.getTotalAmount() + "\n\n" +
                "— Mahika Designer Studio";

            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(toEmail);
            message.setSubject("New Order #" + order.getId() + " — ₹" + order.getTotalAmount());
            message.setText(body);

            mailSender.send(message);
        } catch (Exception e) {
            System.err.println("Failed to send order email: " + e.getMessage());
        }
    }
}
