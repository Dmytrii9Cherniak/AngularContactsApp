import { Component, OnInit } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { ContactService } from '../../services/contact.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalManager } from '../../OOP/modal.manager';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
  standalone: false
})
export class ContactListComponent extends ModalManager implements OnInit {
  contacts: Contact[] = [];
  originalContacts: Contact[] = [];
  searchForm!: FormGroup;
  contactForm!: FormGroup;

  selectedContact?: Contact;

  maxDate: string = '';

  constructor(
    private contactService: ContactService,
    private fb: FormBuilder,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.generateInitialContacts();
    this.loadContacts();
    this.initForms();
    this.setMaxDate();
  }

  private loadContacts(): void {
    this.originalContacts = this.contactService.getContacts();
    this.contacts = [...this.originalContacts];
  }

  private initForms(): void {
    this.searchForm = this.fb.group({
      searchQuery: ['']
    });

    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      email: ['', [Validators.required, Validators.email]],
      address: [''],
      birthDate: [''],
      companyName: [''],
      position: ['']
    });
  }

  onSearch(): void {
    const query = this.searchForm.get('searchQuery')?.value?.toLowerCase() || '';
    if (query) {
      this.contacts = this.originalContacts.filter(
        (contact) =>
          `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(query) ||
          contact.email.toLowerCase().includes(query)
      );
    } else {
      this.contacts = [...this.originalContacts];
    }
  }

  clearSearch(): void {
    this.searchForm.reset();
    this.loadContacts();
  }

  openAddModal(): void {
    this.contactForm.reset();
    this.openModal('addContact');
  }

  openEditModal(contact: Contact): void {
    this.selectedContact = contact;
    this.contactForm.patchValue(contact);
    this.openModal('editContact');
  }

  openDeleteModal(contact: Contact): void {
    this.selectedContact = contact;
    this.openModal('deleteContact');
  }

  closeAddModal(): void {
    this.closeModal('addContact');
  }

  closeEditModal(): void {
    this.closeModal('editContact');
  }

  closeDeleteModal(): void {
    this.closeModal('deleteContact');
  }

  saveContact(): void {
    if (this.contactForm.invalid) {
      // Позначаємо всі поля як "touched", щоб помилки відображалися
      this.markAllFieldsAsTouched();
      return;
    }

    if (this.isModalVisible('editContact') && this.selectedContact) {
      const updatedContact = { ...this.selectedContact, ...this.contactForm.value };
      this.contactService.updateContact(updatedContact);
    } else if (this.isModalVisible('addContact')) {
      const newContact: Contact = {
        id: 0,
        ...this.contactForm.value
      };
      this.contactService.addContact(newContact);
    }

    this.loadContacts();
    this.closeAllModals();
  }

  private markAllFieldsAsTouched(): void {
    Object.keys(this.contactForm.controls).forEach((field) => {
      const control = this.contactForm.get(field);
      control?.markAsTouched();
    });
  }

  confirmDeleteContact(): void {
    if (this.selectedContact) {
      this.contactService.deleteContact(this.selectedContact.id);
      this.loadContacts();
      this.closeDeleteModal();
    }
  }

  closeAllModals(): void {
    this.closeModal('addContact');
    this.closeModal('editContact');
    this.closeModal('deleteContact');
  }

  getDeleteConfirmationMessage(): string {
    if (!this.selectedContact) return 'Are you sure you want to delete this contact?';
    return `Are you sure you want to delete contact ${this.selectedContact.firstName} ${this.selectedContact.lastName}?`;
  }

  viewContactDetails(contactId: number): void {
    this.router.navigate(['/contact', contactId]);
  }

  private setMaxDate(): void {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    this.maxDate = `${year}-${month}-${day}`;
  }

  private generateInitialContacts(): void {
    const existingContacts = this.contactService.getContacts();
    if (existingContacts.length === 0) {
      this.contactService.generateRandomContacts(11);
    }
  }
}
