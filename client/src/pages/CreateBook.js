import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";

function CreateBook() {
  let history = useHistory();
  const initialValues = {
    name: "",
    isbn: "",
    author: "",
    materialType: "",
    isAvailable: "",
    isReservation: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    isbn: Yup.string().required(),
    author: Yup.string().required(),
    materialType: Yup.string().required(),
    isAvailable: Yup.number().required(),
    isReservation: Yup.number().required(),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/books", data).then((response) => {
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
          <label>Name : </label>
          <ErrorMessage name="name" component="span" />
          <Field
            autocomplete="off"
            id="inputCreateBook"
            name="name"
            placeholder="(Ex. John...)"
          />
          <label>ISBN : </label>
          <ErrorMessage name="isbn" component="span" />
          <Field
            id="inputCreateBook"
            name="isbn"
            placeholder="(Ex. ISBN8978978...)"
            autocomplete="off"
          />
          <label>Author : </label>
          <ErrorMessage name="author" component="span" />
          <Field
            autocomplete="off"
            id="inputCreateBook"
            name="author"
            placeholder="(Ex. John...)"
          />
          <label>Type : </label>
          <ErrorMessage name="materialType" component="span" />
          <Field
            autocomplete="off"
            id="inputCreateBook"
            name="materialType"
            placeholder="(Ex. Ders Kitabı)"
          />
          <label>isAvailable : </label>
          <ErrorMessage name="isAvailable" component="span" />
          <Field
            autocomplete="off"
            id="inputCreateBook"
            name="isAvailable"
            placeholder="(Ex. 1)"
          />
          <label>isReservation : </label>
          <ErrorMessage name="isReservation" component="span" />
          <Field
            autocomplete="off"
            id="inputCreateBook"
            name="isReservation"
            placeholder="(Ex. 1)"
          />
          <button type="submit">Create Book</button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreateBook;
