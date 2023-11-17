import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Table, Button } from 'react-bootstrap';

import Pagination from './Pagination';
import { getPeopleData } from './lib/getPeopleData';

const data = [
  {
    "name": "Luke Skywalker",
    "height": "172",
    "mass": "77",
    "hair_color": "blond",
    "skin_color": "fair",
  }
]

const HomeComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const perPage = 10;

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getPeopleData(page, search);
      setData(data.results);
      setTotalPages(Math.ceil(data.count / perPage));
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    setPage(1);
  }, [search])

  const handleSearch = () => {
    fetchData();
  }

  const handleClear = () => {
    setSearch('');
    handleSearch();
  }

  return (
    <div>
      <Container className="mt-5">
        <Row className="text-center">
          <h1>Nueva tabla</h1>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="search">
              <Row>
                <Col md={10}>
                  <Form.Control type='text' placeholder='Search...' value={String(search)} onChange={(e) => setSearch(e.target.value)} />
                </Col>
                <Col md={1}>
                  <Button className="ml-2" onClick={handleClear}>Clear</Button>
                </Col>
                <Col md={1}>
                  <Button className="ml-2" onClick={handleSearch}>Search</Button>
                </Col>
              </Row>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-5">
          <Row>
            {data && data.length > 0 ? (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Height</th>
                    <th>Mass</th>
                    <th>Hair Color</th>
                    <th>Skin Color</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    data.map((value, index) => (
                      <tr key={`person-${index}`}>
                        <td>{value.name}</td>
                        <td>{value.height}</td>
                        <td>{value.mass}</td>
                        <td>{value.hair_color}</td>
                        <td>{value.skin_color}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </Table>
            ) : loading ? <div>Loading...</div> : (<div>No Data</div>)}
          </Row>
          <Row>
            <Pagination page={page} totalPages={totalPages} handlePagination={(page) => setPage(page)} />
          </Row>
        </Row>
      </Container>
    </div>
  )
};

export default HomeComponent;
