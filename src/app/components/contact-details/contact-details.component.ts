import { Component, OnInit } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.scss',
  standalone: false
})
export class ContactDetailsComponent implements OnInit {
  contact?: Contact;

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    const contactId = +this.route.snapshot.paramMap.get('id')!;
    this.contact = this.contactService.getContactById(contactId);
  }
}
