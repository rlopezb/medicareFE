import DefaultLayout from '../layouts/DefaultLayout';
import React, {useCallback, useEffect, useState} from 'react';
import {Button, ButtonGroup, Col, Container, Row} from 'react-bootstrap';
import {toast} from 'react-toastify';
import api from '../api/api';
import MedicineCard from '../components/MedicineCard';
import SideBar from '../components/SideBar';

function Home() {
  const [loading, setLoading] = useState(false);
  const [medicines, setMedicines] = useState([]);
  const [pagination, setPagination] = useState({page: 0});
  const [filter, setFilter] = useState({});

  const getMedicines = useCallback(() => {
    setLoading(true);
    let url = '/medicine?page=' + pagination.page;
    if (filter.search && filter.search.length > 0)
      url = url + '&search=' + filter.search;
    if (filter.seller && filter.seller.length > 0)
      url = url + '&seller=' + filter.seller;
    if (typeof filter.price === 'number')
      url = url + '&price=' + filter.price;
    if (filter.sort && filter.sort.length > 0) {
      url = url + '&sort=' + filter.sort;
      if (filter.descending)
        url = url + ',desc';
    }
    api.get(url)
        .then(response => {
          setMedicines(response.data.content);
          setPagination({
            page: response.data.number,
            total: response.data.totalElements,
            pages: response.data.totalPages,
            first: response.data.first,
            last: response.data.last,
            start: response.data.number * response.data.size + 1,
            end: response.data.number * response.data.size + response.data.size,
          });
          setLoading(false);
        })
        .catch(error => {
          console.log(error);
          toast.error(error.message);
          setLoading(false);
        });
  },[filter.descending, filter.price, filter.search, filter.seller, filter.sort, pagination.page]);

  let onFirst = () => {
    setPagination({...pagination, ...{page: 0}});
  };
  let onPrevious = () => {
    setPagination({...pagination, ...{page: pagination.page - 1}});
  };
  let onNext = () => {
    setPagination({...pagination, ...{page: pagination.page + 1}});
  };
  let onLast = () => {
    setPagination({...pagination, ...{page: pagination.pages - 1}});
  };

  let onAdd = (id) => {
    console.log('Medicine with id ' + id + ' added to shopping cart')
  }

  let onSearch = (newFilter) => {
    setPagination({page: 0});
    setFilter(newFilter);
  }

  useEffect(() => getMedicines(), [getMedicines, filter]);

  return <DefaultLayout>
    <Container fluid>
      <Row className='float-start mt-4'>
        <SideBar onSearch={onSearch}/>
      </Row>
      <Row className='justify-content-start row-cols-auto'>
        {medicines.map(medicine => {
          return <Col key={medicine.id} className='m-0 p-0'>
            <MedicineCard medicine={medicine} onAdd={onAdd}></MedicineCard>
          </Col>
        })}
      </Row>
      <Row className='float-end   mt-4'>
        <ButtonGroup>
          <Button variant='outline-secondary' onClick={onFirst} disabled={loading || pagination.first}>&#8810;</Button>
          <Button variant='outline-secondary' onClick={onPrevious} disabled={loading || pagination.first}>&#60;</Button>
          <Button variant='outline-secondary'>page {pagination.page + 1} of {pagination.pages}</Button>
          <Button variant='outline-secondary' onClick={onNext} disabled={loading || pagination.last}>&#62;</Button>
          <Button variant='outline-secondary' onClick={onLast} disabled={loading || pagination.last}>&#8811;</Button>
        </ButtonGroup>
      </Row>
    </Container>
  </DefaultLayout>
}

export default Home;