import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";

function CreateReservedBooks() {
  let history = useHistory();
  const initialValues = {
    userId: "",
    isbn: "",
    reservedDate: "",
  };
  function formatDate(date) {
    return new Date(date).toLocaleDateString();
  }
  const validationSchema = Yup.object().shape({
    userId: Yup.string().required(),
    isbn: Yup.string().required(),
    reservedDate: Yup.date().required(),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/reservedbooks", data).then((response) => {
      history.push("/");
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
          <label>ISBN : </label>
          <ErrorMessage name="cardCode" component="span" />
          <Field
            id="inputCreateBook"
            name="isbn"
            placeholder="(Ex. ISBN748578...)"
            autocomplete="off"
          />
          <label>Reserved Date : </label>
          <ErrorMessage name="balance" component="span" />
          <Field
            autocomplete="off"
            id="inputCreateBook"
            name="reservedDate"
            placeholder="(Ex. 2021/02/17)"
          />
          <button type="submit">Reserve the book</button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreateReservedBooks;
