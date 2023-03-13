import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';
import GuardList from './GuardList';
import WriteUpForm from './WriteUpForm';

const SupervisorHome = () => {
  const [guards, setGuards] = useState([]);

  // Fetches the list of guards from the server
  const fetchGuards = async () => {
    try {
      const res = await fetch('/api/guards');
      const data = await res.json();
      setGuards(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchGuards();
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="my-4">Supervisor Dashboard</h1>
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Guard List</h5>
            </Card.Header>
            <Card.Body>
              <GuardList guards={guards} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Write Up a Guard</h5>
            </Card.Header>
            <Card.Body>
              <WriteUpForm />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SupervisorHome;
