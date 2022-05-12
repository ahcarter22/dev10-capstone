package warehouse.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;
import warehouse.domain.EmailService;

import java.util.Map;


// RestController annotates spring into dependency
@RestController
// @CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/api")
public class EmailController {


    private EmailService emailService;

    public EmailController(
            EmailService emailService){
        this.emailService = emailService;
    }

    @PostMapping("/message")
    String sendEmailMessage(@RequestBody Map<String, String> emailMap) {
        this.emailService.sendMessage(
                emailMap.get("to"),
                emailMap.get("subject"),
                emailMap.get("text")
        );

        return "Message sent";
    }

}
