import { Injectable } from '@angular/core';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private readonly storageKey = 'contacts';

  getContacts(): Contact[] {
    const contacts = localStorage.getItem(this.storageKey);
    return contacts ? JSON.parse(contacts) : [];
  }

  saveContacts(contacts: Contact[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(contacts));
  }

  addContact(contact: Contact): void {
    const contacts = this.getContacts();

    if (contacts.some((existingContact) => existingContact.email === contact.email)) {
      alert('A contact with this email already exists!');
      return;
    }

    contact.id = Date.now() + Math.floor(Math.random() * 1000);
    contacts.push(contact);
    this.saveContacts(contacts);
  }

  updateContact(updatedContact: Contact): void {
    const contacts = this.getContacts().map((contact) =>
      contact.id === updatedContact.id ? updatedContact : contact
    );
    this.saveContacts(contacts);
  }

  deleteContact(contactId: number): void {
    const contacts = this.getContacts().filter((contact) => contact.id !== contactId);
    this.saveContacts(contacts);
  }

  getContactById(contactId: number): Contact | undefined {
    return this.getContacts().find((contact) => contact.id === contactId);
  }

  generateRandomContacts(count: number): void {
    const contacts = this.getContacts();
    for (let i = 0; i < count; i++) {
      const newContact: Contact = {
        id: Date.now() + i,
        firstName: this.getRandomFirstName(),
        lastName: this.getRandomLastName(),
        phoneNumber: this.getRandomPhoneNumber(),
        email: this.getRandomEmail(),
        address: this.getRandomAddress(),
        birthDate: this.getRandomBirthDate(),
        companyName: this.getRandomCompanyName(),
        position: this.getRandomPosition()
      };
      contacts.push(newContact);
    }
    this.saveContacts(contacts);
  }

  private getRandomFirstName(): string {
    const firstNames = ['John', 'Jane', 'Alex', 'Emily', 'Michael', 'Sarah', 'David', 'Anna'];
    return firstNames[Math.floor(Math.random() * firstNames.length)];
  }

  private getRandomLastName(): string {
    const lastNames = ['Smith', 'Johnson', 'Brown', 'Taylor', 'Anderson', 'Lee', 'Clark', 'Walker'];
    return lastNames[Math.floor(Math.random() * lastNames.length)];
  }

  private getRandomPhoneNumber(): string {
    return '0' + Math.floor(100000000 + Math.random() * 900000000).toString();
  }

  private getRandomEmail(): string {
    const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'mail.com'];
    return `${this.getRandomFirstName().toLowerCase()}.${this.getRandomLastName().toLowerCase()}@${domains[Math.floor(Math.random() * domains.length)]}`;
  }

  private getRandomAddress(): string {
    const streets = ['Main St', 'High St', 'Church St', 'Station Rd', 'Park Rd'];
    const houseNumber = Math.floor(1 + Math.random() * 100);
    return `${houseNumber} ${streets[Math.floor(Math.random() * streets.length)]}`;
  }

  private getRandomBirthDate(): string {
    const start = new Date(1960, 0, 1);
    const end = new Date(2000, 11, 31);
    const birthDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return birthDate.toISOString().split('T')[0];
  }

  private getRandomCompanyName(): string {
    const companies = ['TechCorp', 'InnovateX', 'Global Solutions', 'NextGen Ltd', 'SoftServ'];
    return companies[Math.floor(Math.random() * companies.length)];
  }

  private getRandomPosition(): string {
    const positions = ['Developer', 'Manager', 'Analyst', 'Designer', 'Tester'];
    return positions[Math.floor(Math.random() * positions.length)];
  }
}
