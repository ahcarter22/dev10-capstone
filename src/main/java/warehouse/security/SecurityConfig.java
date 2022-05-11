
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
                .antMatchers( HttpMethod.GET, "/").permitAll()
                .antMatchers( HttpMethod.POST, "/api/login").permitAll()
                .antMatchers( HttpMethod.POST, "/api/message").permitAll()

                .antMatchers( HttpMethod.GET, "/api/category").authenticated()
                .antMatchers( HttpMethod.GET, "/api/category/*").authenticated()

                .antMatchers( HttpMethod.GET, "/api/item").authenticated()
                .antMatchers( HttpMethod.GET, "/api/item/*" ).authenticated()
                .antMatchers( HttpMethod.POST, "/api/item").authenticated()
                .antMatchers( HttpMethod.PUT, "/api/item/*").hasRole("ADMIN")
                .antMatchers( HttpMethod.DELETE, "/api/item/*").hasRole("ADMIN")

                .antMatchers( HttpMethod.GET, "/api/vendor").authenticated()
                .antMatchers( HttpMethod.GET, "/api/vendor/*" ).authenticated()
                .antMatchers( HttpMethod.POST, "/api/vendor").authenticated()
                .antMatchers( HttpMethod.PUT, "/api/vendor/*").hasRole("ADMIN")
                .antMatchers( HttpMethod.DELETE, "/api/vendor/*").hasRole("ADMIN")

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
                        .allowedOrigins("*")
                        .allowedMethods("*");
            }
        };
    }
}
