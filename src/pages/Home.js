import DefaultLayout from '../layouts/DefaultLayout';
import React, {useCallback, useEffect, useState} from 'react';
import {Button, Col, Container, Row} from 'react-bootstrap';
import {toast} from 'react-toastify';
import api from '../api/api';
import MedicineCard from '../components/MedicineCard';
import SideBar from '../components/SideBar';
import {useDispatch, useSelector} from 'react-redux';
import useBus from 'use-bus'

function Home() {
  let dispatch = useDispatch();
  const purchase = useSelector(state => state.purchase);
  const loading = useSelector(state => state.loading);

  let [medicines, setMedicines] = useState([]);
  let [page, setPage] = useState(0);
  let [last, setLast] = useState(false);
  let [filter, setFilter] = useState({});

  useBus('ADD_MEDICINE', (action) => onAdd(action.payload), [purchase]);
  useBus('SEARCH', (action) => onSearch(action.payload), [filter, medicines, page]);

  const getMedicines = useCallback(() => {
    dispatch({type: 'SET_LOADING', payload: true});
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
          dispatch({type: 'SET_LOADING', payload: false});
        })
        .catch(error => {
          console.log(error);
          toast.error(error.message);
          dispatch({type: 'SET_LOADING', payload: false});
        });
  }, [dispatch, filter.descending, filter.price, filter.search, filter.seller, filter.sort, page]);

  let onAdd = (id) => {
    dispatch({type: 'SET_LOADING', payload: true});
    if (typeof purchase === 'undefined') {
      api.post('/purchase')
          .then(response => {
            api.put('/purchase/' + response.data.id + '/add/' + id)
                .then(response => {
                  dispatch({type: 'SET_PURCHASE', payload: response.data});
                  toast.success('Medicine added to shopping cart successfully');
                  dispatch({type: 'SET_LOADING', payload: false});
                })
                .catch(error => {
                  console.log(error);
                  toast.error(error.message);
                  dispatch({type: 'SET_LOADING', payload: false});
                });
          })
          .catch(error => {
            console.log(error);
            toast.error(error.message);
            dispatch({type: 'SET_LOADING', payload: false});
          });
    } else {
      api.put('/purchase/' + purchase.id + '/add/' + id)
          .then(response => {
            dispatch({type: 'SET_PURCHASE', payload: response.data});
            toast.success('Medicine added to shopping cart successfully');
            dispatch({type: 'SET_LOADING', payload: false});
          })
          .catch(error => {
            console.log(error);
            toast.error(error.message);
            dispatch({type: 'SET_LOADING', payload: false});
          });
    }
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
        <Col md='auto'>
          <SideBar/>
        </Col>
        <Col>
          <Container>
            <Row className='justify-content-start row-cols-auto'>
              {medicines.map(medicine =>
                  <Col key={medicine.id} className='m-0 p-0'>
                    <MedicineCard medicine={medicine}></MedicineCard>
                  </Col>
              )}
            </Row>
            <Row>
              <Col className='text-center'>
                <Button variant='dark' className={last ? 'invisible' : 'visible'} disabled={loading || last}
                        onClick={onMore}>{loading ? 'Loading' : 'Load more'}</Button>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>

  </DefaultLayout>
}

export default Home;