# Generated by Django 4.0.4 on 2022-11-06 17:30

import ckeditor.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0037_recording_zip_file'),
    ]

    operations = [
        migrations.AddField(
            model_name='topic',
            name='comment_rtf',
            field=ckeditor.fields.RichTextField(blank=True, null=True),
        ),
    ]
