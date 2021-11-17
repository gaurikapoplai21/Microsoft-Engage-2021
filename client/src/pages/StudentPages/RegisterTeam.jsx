import React from 'react'

const RegisterTeam = () => {
    return (
        <div>
            <Navbar userType="student"/>
      <br />
      <h2> Create an Event </h2>
      <br />
      <div style={{ display: "block" }}>
        <Form style={{ width: "50%", display: "inline-block" }}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Event Name</Form.Label>
            <Form.Control
              type="text"
              name="eventName"
              placeholder="Event Name"
              value={event.eventName}
              onChange={handleInput}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Event Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="eventDescription"
              value={event.eventDescription}
              onChange={handleInput}
            />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Reference Files</Form.Label>
            <Form.Control type="file" onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Reference Links</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="referenceLinks"
              value={event.referenceLinks}
              onChange={handleInput}
            />
          </Form.Group>
          <br />
          <Row>
            <Col>
              <Form.Label>Minimim Team Size</Form.Label>
              <Form.Control
                placeholder="Minimum Team Size"
                name="minTeamSize"
                value={event.minTeamSize}
                onChange={handleInput}
              />
            </Col>
            <Col>
              <Form.Label>Maximum Team Size</Form.Label>
              <Form.Control
                placeholder="Maximum Team Size"
                name="maxTeamSize"
                value={event.maxTeamSize}
                onChange={handleInput}
              />
            </Col>
            <Col>
              <Form.Label>Maximum Marks</Form.Label>
              <Form.Control
                placeholder="Maximum Marks"
                name="maxMarks"
                value={event.maxMarks}
                onChange={handleInput}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <Form.Label>Registration Deadline</Form.Label>
              <DatePicker
                name="registrationDeadline"
                selected={registrationDeadline}
                onChange={(date) => setRegistrationDeadline(date)}
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
              />
            </Col>
            <Col>
              <Form.Label>Submission Deadline</Form.Label>
              <DatePicker
                selected={submissionDeadline}
                onChange={(date) => setSubmissionDeadline(date)}
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
              />
            </Col>
          </Row>
          <br />
          <Button onClick={handleSubmit} variant="contained" style={{marginBottom:"20px"}}>
            Submit{" "}
          </Button>
        </Form>
      </div>
    </div>
        </div>
    )
}

export default RegisterTeam

