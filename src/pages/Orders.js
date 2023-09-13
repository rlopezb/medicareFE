import {useCallback, useEffect, useState} from "react";
import api from "../api/api";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import DefaultLayout from "../layouts/DefaultLayout";
import {Col, Container, Row} from "react-bootstrap";
import OrderCard from "../components/OrderCard";

function Orders() {
  let dispatch = useDispatch();
  let [orders, setOrders] = useState([]);
  let [last, setLast] = useState(false);
  let [page, setPage] = useState(0);

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
      {typeof orders !== 'undefined' && orders.map(order =>
          <Row key={order.id}>
            <Col>
              <OrderCard order={order}/>
            </Col>
          </Row>)}
      <Row>
      </Row>
    </Container>
  </DefaultLayout>
}

export default Orders;