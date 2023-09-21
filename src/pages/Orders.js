import React, {useCallback, useEffect, useState} from "react";
import api from "../api/api";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import DefaultLayout from "../layouts/DefaultLayout";
import {Button, Col, Container, Row} from "react-bootstrap";
import OrderCard from "../components/OrderCard";

function Orders() {
  let dispatch = useDispatch();
  let [orders, setOrders] = useState([]);
  let [last, setLast] = useState(false);
  let [page, setPage] = useState(0);
  const loading = useSelector(state => state.loading);

  const getOrders = useCallback(() => {
    dispatch({type: 'SET_LOADING', payload: true});
    let url = '/purchase?page=' + page;

    api.get(url)
        .then(response => {
          setOrders((preOrders) => [...preOrders, ...response.data.content]);
          setLast(response.data.last);
          dispatch({type: 'SET_LOADING', payload: false});
        })
        .catch(error => {
          console.log(error);
          toast.error(error.message);
          dispatch({type: 'SET_LOADING', payload: false});
        });
  }, [dispatch, page]);

  const onMore = () => {
    setPage(page + 1);
  };
  useEffect(() => getOrders(), [getOrders]);

  return <DefaultLayout>
    <Container>
      <div className='h2 my-4'>Orders</div>
      {typeof orders !== 'undefined' && orders.length>0 && orders.map(order =>
          <Row key={order.id}>
            <Col>
              <OrderCard order={order}/>
            </Col>
          </Row>)}
      {(typeof orders === 'undefined' || orders.length===0) &&
          <Row>
            <Col>
              <h6 className='mt-1'>You don't have any order</h6>
            </Col>
          </Row>}

      <Row className='justify-content-start row-cols-auto'>
          <Col className='text-center'>
            <Button variant='dark' className={last ? 'invisible' : 'visible'} disabled={loading || last}
                    onClick={onMore}>{loading ? 'Loading' : 'Load more'}</Button>
          </Col>
        </Row>
    </Container>
  </DefaultLayout>
}

export default Orders;