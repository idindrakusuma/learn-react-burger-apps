import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.css';

import axios from '../../../common/api.orders';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    },
    loading: false,
  }

  orderHanlder = (event) => {
    event.preventDefault();
    /* set loading */
    this.setState({ loading: true })
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Indra Kusuma',
        address: {
          street: 'Jalan Pusponjolo',
          city: 'Semarang',
          zipCode: 12334,
          country: 'Indonesia'
        },
        email: 'id.indrakusuma@gmail.com'
      },
      deliveryMethod: 'fastest'
    };
    /* post to backend */
    axios.post('/orders.json', order)
      .then(res => {
        console.log(res)
        this.setState({ loading: false})
        this.props.history.replace('/');
      })
      .catch(err => {
        console.log(err)
        this.setState({ loading: false})
      })
  }

  render() {
    let form = null;
    if (!this.state.loading) {
      form = (
        <form>
          <Input inputtype="input" type="text" name="name" placeholder="Enter your Name"/>
          <Input inputtype="input" type="email" name="email" placeholder="Enter your Email"/>
          <Input inputtype="input" type="text" name="street" placeholder="Enter your Street"/>
          <Input inputtype="input" type="text" name="postalCode" placeholder="Enter your Postal Code"/>
          <Button btnType="Success" clicked={this.orderHanlder} >ORDER</Button>
        </form>
      );
    } else {
      form = (
        <Spinner />
      );
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;