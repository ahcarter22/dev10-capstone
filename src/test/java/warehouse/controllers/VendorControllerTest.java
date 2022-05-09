package warehouse.controllers;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import warehouse.data.AppUserRepository;
import warehouse.data.VendorRepository;
import warehouse.models.AppUser;
import warehouse.models.Vendor;
import warehouse.security.JwtConverter;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.MediaType;


import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class VendorControllerTest {
    @MockBean
    VendorRepository vendorRepository;

    @MockBean
    AppUserRepository appUserRepository;

    @Autowired
    MockMvc mvc;

    @Autowired
    JwtConverter jwtConverter;

    String token;

    @BeforeEach
    void setup() {
        AppUser appUser = new AppUser(1, "john@smith.com", "P@ssw0rd!", false,
                List.of("ADMIN"));

        when(appUserRepository.findByUsername("john@smith.com")).thenReturn(appUser);

        token = jwtConverter.getTokenFromUser(appUser);
    }

    @Test
    void addShouldReturn400WhenEmpty() throws Exception {

        var request = post("/api/vendor")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer " + token);

        mvc.perform(request)
                .andExpect(status().isBadRequest());
    }

    @Test
    void addShouldReturn400WhenInvalid() throws Exception {

        ObjectMapper jsonMapper = new ObjectMapper();

        Vendor vendor = new Vendor();
        String agencyJson = jsonMapper.writeValueAsString(vendor);

        var request = post("/api/vendor")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer " + token)
                .content(agencyJson);

        mvc.perform(request)
                .andExpect(status().isBadRequest());

    }

    @Test
    void addShouldReturn415WhenMultipart() throws Exception {

        ObjectMapper jsonMapper = new ObjectMapper();

        Vendor vendor = new Vendor(0, "TEST", "email@test.com", "123-456-7890",null);
        String agencyJson = jsonMapper.writeValueAsString(vendor);

        var request = post("/api/vendor")
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .header("Authorization", "Bearer " + token)
                .content(agencyJson);

        mvc.perform(request)
                .andExpect(status().isUnsupportedMediaType());
    }

    @Test
    void addShouldReturn201() throws Exception {

        Vendor vendor = new Vendor(0, "TEST", "email@test.com", "123-456-7890",null);
        Vendor expected = new Vendor(1, "TEST", "email@test.com", "123-456-7890",null);

        when(vendorRepository.add(any())).thenReturn(expected);
        ObjectMapper jsonMapper = new ObjectMapper();

        String vendorJson = jsonMapper.writeValueAsString(vendor);
        String expectedJson = jsonMapper.writeValueAsString(expected);

        var request = post("/api/vendor")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer " + token)
                .content(vendorJson);

        mvc.perform(request)
                .andExpect(status().isCreated())
                .andExpect(content().json(expectedJson));
    }
}
