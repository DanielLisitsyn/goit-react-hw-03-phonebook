import { Component } from 'react';
import { nanoid } from 'nanoid';

import PhonebookBlock from 'components/PhonebookBlock/PhonebookBlock';
import PhonebookList from '../PhonebookList/PhonebookList';
import PhonebookForm from 'components/PhonebookForm/PhonebookForm';
import css from './Phonebook-module.css';

class Phonebook extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('my-contacts'));
    if (contacts && contacts.length) {
      this.setState({
        contacts,
      });
    }
  }
  componentDidUpdate(_, prevState) {
    const { contacts } = this.state;
    if (contacts.length !== prevState.contacts.length) {
      localStorage.setItem('my-contacts', JSON.stringify(contacts));
    }
  }

  isDublicate({ name }) {
    const { contacts } = this.state;
    const normalizedName = name.toLowerCase();
    const dublicate = contacts.find(contact => {
      return contact.name.toLowerCase() === normalizedName;
    });
    return Boolean(dublicate);
  }

  onDeleteContact = id => {
    this.setState(prevState => {
      const newContacts = prevState.contacts.filter(
        contact => contact.id !== id
      );
      return {
        contacts: newContacts,
      };
    });
  };

  getFilteredContacts() {
    const { filter, contacts } = this.state;
    if (!filter) {
      return contacts;
    }
    const normalizedfilter = filter.toLocaleLowerCase();
    const result = contacts.filter(({ name, number }) => {
      return (
        name.toLocaleLowerCase().includes(normalizedfilter) ||
        number.toLocaleLowerCase().includes(normalizedfilter)
      );
    });
    return result;
  }

  handleFilterChange = e => {
    const { value } = e.target;
    this.setState({
      filter: value,
    });
  };

  onAddContacts = ({ name, number }) => {
    if (this.isDublicate({ name, number })) {
      return alert(`${name} is already in contacts`);
    }
    this.setState(prevState => {
      const { contacts } = prevState;
      const newContact = {
        name,
        number,
        id: nanoid(),
      };
      return { contacts: [...contacts, newContact] };
    });
  };

  render() {
    const contacts = this.getFilteredContacts();

    return (
      <div className={css.wrapper}>
        <div className={css.block}>
          <PhonebookBlock title="Phonebook">
            <PhonebookForm onSubmit={this.onAddContacts} />
          </PhonebookBlock>

          <PhonebookBlock title="Contacts">
            <p className={css.filterTitel}>Find contacts by name</p>
            <input
              name="filter"
              onChange={this.handleFilterChange}
              value={this.state.filter}
              type="text"
            />
            <PhonebookList
              contacts={contacts}
              onDeleteContact={this.onDeleteContact}
            />
          </PhonebookBlock>
        </div>
      </div>
    );
  }
}

export default Phonebook;
