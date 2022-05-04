
package warehouse.security;

import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.security.authentication.AuthenticationManager;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final JwtConverter converter;

    public SecurityConfig(JwtConverter converter) {
        this.converter = converter;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();

        http.cors();

        http.authorizeRequests()

                .antMatchers( HttpMethod.POST, "/api/login").permitAll()
                .antMatchers( HttpMethod.GET, "/api/item").permitAll()
                .antMatchers( HttpMethod.POST, "/api/item").permitAll()
                .antMatchers( HttpMethod.DELETE, "/api/item/*").permitAll()
                .antMatchers( HttpMethod.GET, "/api/item/*" ).permitAll()
                .antMatchers( HttpMethod.PUT, "/api/item/*").permitAll()

                .antMatchers( HttpMethod.GET, "/api/vendor").permitAll()
                .antMatchers( HttpMethod.POST, "/api/vendor").permitAll()
                .antMatchers( HttpMethod.DELETE, "/api/vendor/*").permitAll()
                .antMatchers( HttpMethod.GET, "/api/vendor/*" ).permitAll()
                .antMatchers( HttpMethod.PUT, "/api/vendor/*").permitAll()
                .antMatchers( HttpMethod.GET, "/api/category/*").permitAll()
                .antMatchers( HttpMethod.GET, "/api/category").permitAll()
                .antMatchers("/refresh_token").permitAll()
                .antMatchers("/**").denyAll()

                // require authentication for any request...
                .anyRequest().authenticated()
                .and()
                .addFilter(new JwtRequestFilter(authenticationManager(), converter))
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    }

    @Override
    @Bean
    protected AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }

    @Bean
    public PasswordEncoder getEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:3000")
                        .allowedMethods("*");
            }
        };
    }
}
