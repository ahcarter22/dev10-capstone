package warehouse.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import warehouse.domain.EmailService;


// RestController annotates spring into dependency
@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/api")
public class EmailController {


    private EmailService emailService;

    public EmailController(
            EmailService emailService){
        this.emailService = emailService;
    }

    @PostMapping("/message")
    String sendEmailMessage() {
        this.emailService.sendMessage(
                "ahcarter22@gmail.com",
                "Hello World",
                "I hope this works..."

        );

        return "Message sent";
    }

}
