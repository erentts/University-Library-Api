import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axois from "axios";

function Register() {
  const initialValues = {
    username: "",
    password: "",
    userId: "",
    name: "",
    surname: "",
    userType: "",
    reservedBooksCount: 0,
    receivedBooksCount: 0,
    email: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required(),
    password: Yup.string().required(),
    userId: Yup.string().required(),
    name: Yup.string().required(),
    surname: Yup.string().required(),
    userType: Yup.string().required(),
    reservedBooksCount: Yup.number().required(),
    receivedBooksCount: Yup.number().required(),
    email: Yup.string().required(),
  });

  const onSubmit = (data) => {
    axois.post("http://localhost:3001/auth", data).then(() => {
      console.log(data);
    });
  };
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Username : </label>
          <ErrorMessage name="username" component="span" />
          <Field
            autocomplete="off"
            id="inputCreateBook"
            name="username"
            placeholder="(Username..)"
          />
          <label>Password : </label>
          <ErrorMessage name="password" component="span" />
          <Field
            id="inputCreateBook"
            name="password"
            type="password"
            placeholder="(Your Password..)"
            autocomplete="off"
          />
          <label>UserId : </label>
          <ErrorMessage name="userId" component="span" />
          <Field
            autocomplete="off"
            id="inputCreateBook"
            name="userId"
            placeholder="(UserId...)"
          />
          <label>Name : </label>
          <ErrorMessage name="name" component="span" />
          <Field
            autocomplete="off"
            id="inputCreateBook"
            name="name"
            placeholder="(Ex. John)"
          />
          <label>Surname : </label>
          <ErrorMessage name="surname" component="span" />
          <Field
            autocomplete="off"
            id="inputCreateBook"
            name="surname"
            placeholder="(Ex. Doe)"
          />
          <label>User Type : </label>
          <ErrorMessage name="userType" component="span" />
          <Field
            autocomplete="off"
            id="inputCreateBook"
            name="userType"
            placeholder="(Ex. Öğrenci)"
          />

          <label>Reserved Books Count : </label>
          <ErrorMessage name="reservedBooksCount" component="span" />
          <Field
            autocomplete="off"
            id="inputCreateBook"
            name="reservedBooksCount"
          />
          <label>Received Books Count : </label>
          <ErrorMessage name="receivedBooksCount" component="span" />
          <Field
            autocomplete="off"
            id="inputCreateBook"
            name="receivedBooksCount"
          />
          <label>Email : </label>
          <ErrorMessage name="email" component="span" />
          <Field
            autocomplete="off"
            id="inputCreateBook"
            name="email"
            placeholder="(Ex. john@gmail.com)"
          />

          <button type="submit">Register</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Register;
