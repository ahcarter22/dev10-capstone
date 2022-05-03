package warehouse.data;

import warehouse.models.SecurityClearance;

public interface SecurityClearanceRepository {
    SecurityClearance findById(int securityClearanceId);
}
