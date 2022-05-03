package warehouse.data;

import org.springframework.transaction.annotation.Transactional;
import warehouse.models.AppUser;

public interface AppUserRepository {
    @Transactional
    AppUser findByUsername(String username);

    @Transactional
    AppUser create(AppUser user);

    @Transactional
    void update(AppUser user);
}
