import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./common/input";
import Button from "./common/button";

class LoginForm extends Component {
  state = {
    account: {
      username: this.props.defaultUsername ? this.props.defaultUsername : "",
      password: this.props.defaultPassword ? this.props.defaultPassword : "",
    },
    errors: {},
  };

  validate = () => {
    const schema = {
      username: Joi.string().required().label("Username"),
      password: Joi.string().required().label("Password"),
    };

    const result = Joi.validate(this.state.account, schema, {
      abortEarly: false,
    });

    let errors = {};
    if (!result.error) {
      errors = {};
    } else {
      result.error.details.forEach((detail) => {
        errors[detail.path[0]] = detail.message;
      });
    }
    return errors;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors });
    if (errors) return;

    // const { history } = routeProps;
    const { history } = this.props;
    history.push("/");
  };

  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account });
  };

  render() {
    const { account, errors } = this.state;

    return (
      <div className="container">
        <h1 className="my-5">Login Form</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            label="Username"
            name="username"
            value={account.username}
            type="text"
            placeholder="Enter your username..."
            onChange={this.handleChange}
            error={errors.username}
          />
          <Input
            label="Password"
            name="password"
            value={account.password}
            type="password"
            placeholder="Enter your password..."
            onChange={this.handleChange}
            error={errors.password}
          />
          <Button label="Login" />
        </form>
      </div>
    );
  }
}
export default LoginForm;
