package warehouse.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
// @CrossOrigin

public class HealthCheckController {
    @GetMapping("/")
    public ResponseEntity stillAlive(){
        return ResponseEntity.ok().build();
    }
}
