import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";

function CreateCard() {
  let history = useHistory();
  const initialValues = {
    userId: "",
    cardCode: "",
    balance: 0,
  };

  const validationSchema = Yup.object().shape({
    userId: Yup.string().required(),
    cardCode: Yup.string().required(),
    balance: Yup.number().required(),
  });

  const onSubmit = (data) => {
    axios
      .post("http://localhost:3001/cards", data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          history.push("/");
        }
      });
  };

  return (
    <div className="createBookPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>User Id : </label>
          <ErrorMessage name="userId" component="span" />
          <Field
            autocomplete="off"
            id="inputCreateBook"
            name="userId"
            placeholder="(Ex. 170111...)"
          />
          <label>Card Code : </label>
          <ErrorMessage name="cardCode" component="span" />
          <Field
            id="inputCreateBook"
            name="cardCode"
            placeholder="(Ex. 156748578...)"
            autocomplete="off"
          />
          <label>Balance : </label>
          <ErrorMessage name="balance" component="span" />
          <Field
            autocomplete="off"
            id="inputCreateBook"
            name="balance"
            placeholder="(Ex. John...)"
          />
          <button type="submit">Create Card</button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreateCard;
