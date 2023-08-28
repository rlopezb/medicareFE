import DefaultLayout from "../layouts/DefaultLayout";
import React, {useCallback, useEffect, useState} from "react";
import {Button, ButtonGroup, Col, Container, Form, Row, Table} from "react-bootstrap";
import {toast} from "react-toastify";
import api from "../api/api";
import Drugcard from "../components/Drugcard";

function Home() {
  let [medicines, setMedicines] = useState([]);
  let [medicine, setMedicine] = useState(undefined);
  let [pagination, setPagination] = useState({page: 0});
  let [search, setSearch] = useState("");

  let getMedicines = useCallback((search) => {
    api.get("/medicine?page=" + pagination.page + (search.length > 0 ? "&name=" + search : ""))
        .then(response => {
          setMedicines([...response.data.content]);
          setPagination({
            page: response.data.number,
            total: response.data.totalElements,
            pages: response.data.totalPages,
            first: response.data.first,
            last: response.data.last,
            start: response.data.number * response.data.size + 1,
            end: response.data.number * response.data.size + response.data.size,
          });
        })
        .catch(error => {
          console.log(error);
          toast.error(error.message);
        });
  },[pagination.page]);
  let onFirst = () => {
    pagination.page = 0;
    getMedicines(search);
  };
  let onPrevious = () => {
    pagination.page--;
    getMedicines(search);
  };
  let onNext = () => {
    pagination.page++;
    getMedicines(search);
  };
  let onLast = () => {
    pagination.page = pagination.pages - 1;
    getMedicines(search);
  };

  let onSearch = () => {
    pagination.page = 0;
    getMedicines(search);
  }
  let onSelect = (medicine) => {
    setMedicine(medicine);
  }
  let onClose = () => {
    setMedicine(undefined);
  }
  useEffect(() => getMedicines(search), [getMedicines, search]);

  return <DefaultLayout>
    <Container>
      {medicine?<Drugcard medicine={medicine} onClose={onClose}></Drugcard>:null}
      <Row>
        <Col>
          <h2 className="float-start my-3">Drugs</h2>
        </Col>
        <Col>
          <div className="float-end my-3">
            <Form className="d-flex">
              <Form.Control id="search" type="search" placeholder="Search" className="me-2" aria-label="Search"
                            onChange={(event) => setSearch(event.target.value)}/>
              <Button onClick={onSearch}>Search</Button>
            </Form>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Seller</th>
              <th>Description</th>
            </tr>
            </thead>
            <tbody>
            {medicines.map(medicine => {
              return <tr key={medicine.id} onClick={() => onSelect(medicine)}>
                <td>{medicine.name}</td>
                <td>{medicine.price}</td>
                <td>{medicine.seller}</td>
                <td>{medicine.description}</td>
              </tr>
            })}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col>
          <ButtonGroup>
            <Button variant="outline-secondary" onClick={onFirst} disabled={pagination.first}>&#8810;</Button>
            <Button id="previous" variant="outline-secondary" onClick={onPrevious}
                    disabled={pagination.first}>&#60;</Button>
            <Button id="pagination"
                    variant="outline-secondary">page {pagination.page + 1} of {pagination.pages}</Button>
            <Button id="next" variant="outline-secondary" onClick={onNext} disabled={pagination.last}>&#62;</Button>
            <Button variant="outline-secondary" onClick={onLast} disabled={pagination.last}>&#8811;</Button>
          </ButtonGroup>
        </Col>
      </Row>
    </Container>
  </DefaultLayout>
}

export default Home;