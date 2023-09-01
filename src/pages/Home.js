import DefaultLayout from '../layouts/DefaultLayout';
import React, {useCallback, useEffect, useState} from 'react';
import {Button, Col, Container, Row} from 'react-bootstrap';
import {toast} from 'react-toastify';
import api from '../api/api';
import MedicineCard from '../components/MedicineCard';
import SideBar from '../components/SideBar';

function Home() {
  let [loading, setLoading] = useState(false);
  let [medicines, setMedicines] = useState([]);
  let [page, setPage] = useState(0);
  let [last, setLast] = useState(false);
  let [filter, setFilter] = useState({});

  const getMedicines = useCallback(() => {
    setLoading(true);
    let url = '/medicine?page=' + page;
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
          setMedicines((preMedicines) => [...preMedicines, ...response.data.content]);
          setLast(response.data.last);
          setLoading(false);
        })
        .catch(error => {
          console.log(error);
          toast.error(error.message);
          setLoading(false);
        });
  }, [filter.descending, filter.price, filter.search, filter.seller, filter.sort, page]);

  let onAdd = (id) => {
    console.log('Medicine with id ' + id + ' added to shopping cart')
  }

  const onMore = () => {
    setPage(page + 1);
  };

  const onSearch = (newFilter) => {
    setMedicines([]);
    setPage(0);
    setFilter(newFilter);
  }

  useEffect(() => getMedicines(), [filter, getMedicines]);

  return <DefaultLayout>
    <Container fluid>
      <Row>
        <Col md="auto">
            <SideBar onSearch={onSearch}/>
        </Col>
        <Col>
          <Container>
            <Row className='justify-content-start row-cols-auto'>
              {medicines.map(medicine => {
                return <Col key={medicine.id} className='m-0 p-0'>
                  <MedicineCard medicine={medicine} onAdd={onAdd}></MedicineCard>
                </Col>
              })}
            </Row>
            <Row>
              <Col className="text-center">
                <Button variant="dark" className={last?"invisible":"visible"} disabled={loading || last} onClick={onMore}>{loading?"Loading":"Load more"}</Button>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  </DefaultLayout>
}

export default Home;