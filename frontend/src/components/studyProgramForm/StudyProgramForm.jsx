import { useForm } from "react-hook-form";
import { Form, Button, Row, Col, Modal } from "react-bootstrap";

import { postProgram } from "../../redux/apiFetch/StudyProgramSlice";
import { useDispatch, useSelector } from "react-redux";
import ListInputSubject from "./ListInputSubject";
import { useEffect } from "react";
import { getSubjectsNames } from "../../redux/apiFetch/subject";
import { getStudyProgram } from "../../redux/apiFetch/StudyProgramSlice";

const StudyProgramForm = ({ show, setShow }) => {
  let { token } = useSelector((state) => state.login);
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSubjectsNames(token));
  }, [token, dispatch]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      length: null,
      language: "",
      degree: "",
      description: "",
      imageUrl: "",
      field: "",
      osubjects: [],
      ssubjects: [],
      ossubjects: [],
    },
  });
  const onSubmit = (data) => {
    const programPost = {
      token: token,
      body: data,
    };
    dispatch(postProgram(programPost))
      .unwrap()
      .then(() => {
        dispatch(getStudyProgram());
      });
  };

  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>Create study program</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Label>Study program name</Form.Label>
          <Form.Control {...register("name", { required: true })} />
          {errors?.name?.type === "required" && (
            <p className="error">This field is required</p>
          )}

          <Row>
            <Col md={3}>
              <Form.Label>Length</Form.Label>
              <Form.Control
                {...register("length", { required: true })}
                type="number"
              />
              {errors?.length?.type === "required" && (
                <p className="error">This field is required</p>
              )}
            </Col>
            <Col md={4}>
              <Form.Label>Language</Form.Label>
              <Form.Select {...register("language", { required: true })}>
                <option value="czech">Czech</option>
                <option value="english">English</option>
              </Form.Select>
              {errors?.language?.type === "required" && (
                <p className="error">This field is required</p>
              )}
            </Col>
            <Col md={5}>
              <Form.Label>Degree of study</Form.Label>
              <Form.Select {...register("degree", { required: true })}>
                {" "}
                <option value="Bc.">Bc.</option>
                <option value="Ing.">Ing.</option>
              </Form.Select>
              {errors?.degree?.type === "required" && (
                <p className="error">This field is required</p>
              )}
            </Col>
          </Row>
          <Form.Label>Field</Form.Label>
          <Form.Select {...register("field", { required: true })}>
            {" "}
            <option value="it">Information technologies</option>
            <option value="business">Business and economics</option>
          </Form.Select>
          {errors?.field?.type === "required" && (
            <p className="error">This field is required</p>
          )}

          <Form.Label>Image URL</Form.Label>
          <Form.Control {...register("imageUrl", { required: false })} />
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            {...register("description", { required: true })}
          />
          {errors?.description?.type === "required" && (
            <p className="error">This field is required</p>
          )}

          <ListInputSubject
            subjectType="osubjects"
            register={register}
            name="Obligatory subjects"
            control={control}
          />

          <ListInputSubject
            subjectType="ossubjects"
            register={register}
            name="Obligatory-Selective subjects"
            control={control}
          />
          <ListInputSubject
            subjectType="ssubjects"
            register={register}
            name="Selective subjects"
            control={control}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" type="submit" onClick={handleSubmit(onSubmit)}>
          Submit
        </Button>
        <Button
          variant="outline-dark"
          onClick={() => {
            setShow(!show);
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default StudyProgramForm;
