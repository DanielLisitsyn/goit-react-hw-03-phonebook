import { Component } from 'react';
import css from './PhonebookForm.module.css';
import PropTypes from 'prop-types';

class PhonebookForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handelSubmit = e => {
    e.preventDefault();
    const { onSubmit } = this.props;
    onSubmit({ ...this.state });
    this.reset();
  };

  reset() {
    this.setState({ name: '', number: '' });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { name, number } = this.state;
    return (
      <form onSubmit={this.handelSubmit} className={css.form}>
        <div className={css.phonebookGroup}>
          <label className={css.labelForm}>
            Name
            <input
              className={css.inputForm}
              value={name}
              onChange={this.handleChange}
              type="text"
              name="name"
              required
            />
          </label>
        </div>
        <div className={css.phonebookGroup}>
          <label className={css.labelForm}>
            Number
            <input
              className={css.inputForm}
              value={number}
              onChange={this.handleChange}
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
          </label>
        </div>

        <button className={css.addContact} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}

export default PhonebookForm;

PhonebookForm.propTypes = {
  onSubmit: PropTypes.func,
};
