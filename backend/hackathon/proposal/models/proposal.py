from django.db import models

class Proposal(models.Model):
    STATUS_MAPPING = {
        "non conforme": "declined",
        "a verifier": "to_review",
        "validée": "accepted",
        "manque de precision": "to_review",
        "Deja existante": "declined"
    }
    
    code_pro = models.CharField(max_length=255, null=True, blank=True)
    wilaya = models.CharField(max_length=255, null=True, blank=True)
    domaine = models.CharField(max_length=255, null=True, blank=True)
    activity = models.CharField(max_length=255, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    
    # Processed Fields
    code_pro_processed = models.CharField(max_length=255, null=True, blank=True)
    code_pro_language = models.CharField(max_length=50, null=True, blank=True)
    wilaya_processed = models.CharField(max_length=255, null=True, blank=True)
    wilaya_language = models.CharField(max_length=50, null=True, blank=True)
    domaine_processed = models.CharField(max_length=255, null=True, blank=True)
    domaine_language = models.CharField(max_length=50, null=True, blank=True)
    activity_processed = models.CharField(max_length=255, null=True, blank=True)
    activity_language = models.CharField(max_length=50, null=True, blank=True)
    description_processed = models.TextField(null=True, blank=True)
    description_language = models.CharField(max_length=50, null=True, blank=True)
    
    # Status Fields
    status_de_la_proposition = models.CharField(
        max_length=50, null=True, blank=True,
        help_text="Accepted, declined, or to review based on validation criteria."
    )
    raison_du_choix_du_status = models.TextField(null=True, blank=True)
    
    def save(self, *args, **kwargs):
        if self.status_de_la_proposition in self.STATUS_MAPPING:
            self.status_de_la_proposition = self.STATUS_MAPPING[self.status_de_la_proposition]
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"Proposal {self.code_pro or 'Unknown'} - {self.status_de_la_proposition or 'Pending'}"
