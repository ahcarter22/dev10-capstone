package warehouse.controllers;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;
import warehouse.domain.EmailService;
import warehouse.domain.ItemService;
import warehouse.security.JwtConverter;

import java.util.HashMap;
import java.util.Map;
// RestController annotates spring into dependency
@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/api")

// endpoint for authenticating and getting a token
public class AuthController {

    AuthenticationManager authManager;
    JwtConverter converter;
    ItemService service;
    private EmailService emailService;

    public AuthController(
            AuthenticationManager authManager,
            JwtConverter converter,
            ItemService service,
            EmailService emailService){
        this.authManager = authManager;
        this.converter = converter;
        this.service = service;
        this.emailService = emailService;
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody Map<String,String> credentials ){

        UsernamePasswordAuthenticationToken token =
                new UsernamePasswordAuthenticationToken( credentials.get("username"), credentials.get("password") );

        try {
            Authentication authResult = authManager.authenticate(token);

            if( authResult.isAuthenticated() ){
                User toConvert = (User)authResult.getPrincipal();

                String jwt = converter.getTokenFromUser( toConvert );

                Map<String, String> tokenWrapper = new HashMap<>();
                tokenWrapper.put("jwt_token", jwt);

                return ResponseEntity.ok( tokenWrapper );
            }
        } catch ( AuthenticationException ex ){
            ex.printStackTrace(System.err);
        }


        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }


}
