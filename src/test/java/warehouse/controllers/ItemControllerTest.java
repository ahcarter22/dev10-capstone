package warehouse.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import warehouse.data.AppUserRepository;
import warehouse.data.ItemRepository;
import warehouse.data.VendorRepository;
import warehouse.models.AppUser;
import warehouse.models.Item;
import warehouse.security.JwtConverter;

import java.time.LocalDate;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class ItemControllerTest {

    @MockBean
    ItemRepository itemRepository;

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

        var request = post("/api/item")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer " + token);

        mvc.perform(request)
                .andExpect(status().isBadRequest());
    }

    @Test
    void addShouldReturn400WhenInvalid() throws Exception {

        ObjectMapper jsonMapper = new ObjectMapper();

        Item item = new Item();
        String agencyJson = jsonMapper.writeValueAsString(item);

        var request = post("/api/item")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer " + token)
                .content(agencyJson);

        mvc.perform(request)
                .andExpect(status().isBadRequest());

    }

    @Test
    void addShouldReturn415WhenMultipart() throws Exception {

        ObjectMapper jsonMapper = new ObjectMapper();


        Item item = new Item(0, "TEST", 100, "pounds", (LocalDate.of(2020, 9, 16)), null, 1, 2);
        String itemJson = jsonMapper.writeValueAsString(item);

        var request = post("/api/item")
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .header("Authorization", "Bearer " + token)
                .content(itemJson);

        mvc.perform(request)
                .andExpect(status().isUnsupportedMediaType());
    }

    @Test
    void addShouldReturn201() throws Exception {

        List<Item> itemList = itemRepository.findAll();

        Item item = new Item(0, "TEST", 100, "pounds", (LocalDate.of(2020, 9, 16)), null, 1, 2);
        Item expected = new Item(1, "TEST", 100, "pounds", (LocalDate.of(2020, 9, 16)), null, 1, 2);

        when(itemRepository.add(any())).thenReturn(expected);
        ObjectMapper jsonMapper = new ObjectMapper();

        String itemJson = jsonMapper.writeValueAsString(item);
        String expectedJson = jsonMapper.writeValueAsString(expected);

        var request = post("/api/item")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer " + token)
                .content(itemJson);

        mvc.perform(request)
                .andExpect(status().isCreated())
                .andExpect(content().json(expectedJson));
    }
}


