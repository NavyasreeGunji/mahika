package com.shopping.service;

import com.shopping.model.Order;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Service
public class EmailService {

    @Value("${resend.api.key:}")
    private String apiKey;

    @Value("${spring.mail.username:mahikadesignerstudio@gmail.com}")
    private String toEmail;

    private static final String FROM = "Mahika Designer Studio <onboarding@resend.dev>";

    public String sendTestEmail() {
        return sendEmail(
            "Mahika Email Test ✓",
            "Email service is working correctly.\n\n— Mahika Designer Studio"
        );
    }

    public void sendOrderNotification(Order order) {
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
            "Payment    : " + order.getPaymentMethod() +
                (order.getUpiId() != null && !order.getUpiId().isEmpty() ? " | UPI: " + order.getUpiId() : "") + "\n\n" +
            "Items:\n" + items +
            "\nTotal: ₹" + order.getTotalAmount() + "\n\n" +
            "— Mahika Designer Studio";

        String result = sendEmail("New Order #" + order.getId() + " — ₹" + order.getTotalAmount(), body);
        if (result.startsWith("Email failed")) {
            System.err.println(result);
        }
    }

    private String sendEmail(String subject, String text) {
        if (apiKey == null || apiKey.isBlank()) {
            return "Email failed: RESEND_API_KEY not configured";
        }
        try {
            String jsonBody = "{"
                + "\"from\":\"" + FROM + "\","
                + "\"to\":[\"" + toEmail + "\"],"
                + "\"subject\":" + jsonString(subject) + ","
                + "\"text\":" + jsonString(text)
                + "}";

            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://api.resend.com/emails"))
                .header("Authorization", "Bearer " + apiKey)
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
                .build();

            HttpResponse<String> response = HttpClient.newHttpClient()
                .send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() == 200 || response.statusCode() == 201) {
                return "Email sent successfully to " + toEmail;
            } else {
                return "Email failed: HTTP " + response.statusCode() + " — " + response.body();
            }
        } catch (Exception e) {
            return "Email failed: " + e.getMessage();
        }
    }

    private String jsonString(String s) {
        return "\"" + s.replace("\\", "\\\\").replace("\"", "\\\"")
                       .replace("\n", "\\n").replace("\r", "\\r") + "\"";
    }
}
