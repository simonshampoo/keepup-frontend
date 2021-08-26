import React, { useContext, useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { gql, useMutation } from "@apollo/client";

import { AuthContext } from "../context/auth";
import { useForm } from "../util/hooks";

const Register = (props) => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      context.login(userData);
      props.history.push("/dashboard");
    },
    onError(error) {
      setErrors(error.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  function registerUser() {
    addUser();
  }

  return (
    <div className="form-container">
      <Form size = "massive" onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>{props.header}</h1>
        <p>{props.tagline}</p>
        <Form.Input
          fluid
          type="text"
          label="username"
          placeholder="username"
          name="username"
          value={values.username}
          error={errors.username ? true : false}
          onChange={onChange}
        />
        <Form.Input
          fluid
          type="email"
          label="email"
          placeholder="email"
          name="email"
          value={values.email}
          error={errors.email ? true : false}
          onChange={onChange}
        />
        <Form.Input
          fluid
          type="password"
          label="password"
          placeholder="password"
          name="password"
          value={values.password}
          error={errors.password ? true : false}
          onChange={onChange}
        />
        <Form.Input
          fluid
          type="password"
          label="confirm password"
          placeholder="confirm password"
          name="confirmPassword"
          value={values.confirmPassword}
          error={errors.confirmPassword ? true : false}
          onChange={onChange}
        />
        <Button type="submit" color="vk">
          register
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Register;
