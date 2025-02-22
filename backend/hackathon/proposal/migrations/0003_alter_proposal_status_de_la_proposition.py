# Generated by Django 5.1.6 on 2025-02-22 11:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("proposal", "0002_remove_proposal_validation_proposition"),
    ]

    operations = [
        migrations.AlterField(
            model_name="proposal",
            name="status_de_la_proposition",
            field=models.CharField(
                blank=True,
                help_text="Accepted, Declined, or To Review based on validation.",
                max_length=50,
                null=True,
            ),
        ),
    ]
