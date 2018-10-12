import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.css';

import axios from '../../../common/api.orders';

class ContactData extends Component {
  state = {
    orderForm: {
        name: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Your Name',
          },
          value: '',
        },
        street: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Street',
          },
          value: '',
        },
        city: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'City',
          },
          value: '',
        },
        zipCode: {
          elementType: 'input',
          elementConfig: {
            type: 'number',
            placeholder: 'ZIP Code',
          },
          value: '',
        },
        country: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Country',
          },
          value: '',
        },
        email: {
          elementType: 'input',
          elementConfig: {
            type: 'email',
            placeholder: 'Your e-Mail',
          },
          value: '',
        },
        deliveryMethod: {
          elementType: 'select',
          elementConfig: {
            options: [
              {value: 'fastest', displayValue: 'Fasttest'},
              {value: 'cheapest', displayValue: 'Cheapest'},
            ]
          },
        },
      },
    loading: false,
  }

  orderHandler = (event) => {
    event.preventDefault();
    /* set loading */
    this.setState({ loading: true });
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }
    /* set the form  */
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData,
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

  /* onchange input handler */
  inputChangedHandler = (event, inputIdentifier) => {
    /* clone the order form from state */
    const updatedOrderForm = {
      ...this.state.orderForm
    }
    /* make spesific */
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    }
    /* update value with inputIdentifier */
    updatedFormElement.value = event.target.value;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    /* update state! */
    this.setState({ orderForm: updatedOrderForm });
  }

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }

    let form = null;
    if (!this.state.loading) {
      form = (
        <form onSubmit={this.orderHandler}>
          {formElementsArray.map(formElement => (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
          ))}
          <Button btnType="Success" clicked={this.orderHandler} >ORDER</Button>
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