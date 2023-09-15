import {Button, Col, Container, Row, Stack} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {NumericFormat} from "react-number-format";
import {BsCartCheckFill, BsCartXFill, BsTrash} from "react-icons/bs";
import api from "../api/api";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

function ShoppingCart({big}) {
  const loading = useSelector(state => state.loading);
  const purchase = useSelector(state => state.purchase);
  let dispatch = useDispatch();
  const navigate = useNavigate();

  const onRemove = (id) => {
    dispatch({type: 'SET_LOADING', payload: true});
    api.delete('/purchase/' + purchase.id + '/remove/' + id)
        .then(response => {
          dispatch({type: 'SET_PURCHASE', payload: response.data});
          toast.success('Medicine removed from shopping cart successfully');
          dispatch({type: 'SET_LOADING', payload: false});
          if (response.data.purchaseMedicines.length === 0) {
            toast.warn('The shopping cart is empty!');
            setTimeout(() => navigate('/home'), 3000);
          }
        })
        .catch(error => {
          console.log(error);
          toast.error(error.message);
          dispatch({type: 'SET_LOADING', payload: false});
        });
  };
  const total = () => {
    if (typeof purchase !== 'undefined') {
      let total = 0;
      purchase.purchaseMedicines.forEach(purchaseMedicine => total = total + purchaseMedicine.quantity * purchaseMedicine.price);
      return total;
    }
    return '';
  }
  const description = (description) => {
    if (big)
      return <Row>
        <Col>
          {description}
        </Col>
      </Row>
  }

  const onPay = () => {
    dispatch({type: 'SET_LOADING', payload: true});
    api.put('/purchase/' + purchase.id + '/pay')
        .then(response => {
          toast.success('Purchase with id ' + purchase.id + ' payed successfully');
          dispatch({type: 'DELETE_PURCHASE', payload: response.data});
          dispatch({type: 'SET_LOADING', payload: false});
          navigate('/home');
        })
        .catch(error => {
          console.log(error);
          toast.error(error.message);
          dispatch({type: 'SET_LOADING', payload: false});
        });
  };

  const onCancel = () => {
    dispatch({type: 'SET_LOADING', payload: true});
    api.delete('/purchase/' + purchase.id + '/cancel')
        .then(response => {
          toast.warn('Purchase with id ' + purchase.id + ' cancelled!');
          dispatch({type: 'DELETE_PURCHASE', payload: response.data});
          dispatch({type: 'SET_LOADING', payload: false});
          navigate('/home');
        })
        .catch(error => {
          console.log(error);
          toast.error(error.message);
          dispatch({type: 'SET_LOADING', payload: false});
        });
  };

  const actions = () => {
    if (big)
      return <Row className='mt-3'>
        <Col>
          <Button disabled={loading} className='me-2' variant='primary' onClick={() => onPay()}><BsCartCheckFill
              className='me-2 mb-1'/>Checkout</Button>
          <Button disabled={loading} variant='secondary' onClick={() => onCancel()}><BsCartXFill className='me-2 mb-1'/>Cancel</Button>
        </Col>
      </Row>

  }
  return <Stack gap={2}>
    <Container
        style={{fontSize: big ? '1.1rem' : '0.9rem'}}>
      <div className={big ? 'h2 my-4' : 'h4 my-4'}>Shopping cart</div>
      {typeof purchase !== 'undefined' && purchase.purchaseMedicines.map(purchaseMedicine => {
            return <div key={purchaseMedicine.id}><Row>
              <Col style={{fontWeight: 'bold', fontSize: big ? '1.2rem' : '0.8rem'}}>{purchaseMedicine.medicine.name}</Col>
              <Col xs={"auto"} className='text-end'>
                <NumericFormat value={purchaseMedicine.price.toFixed(2)}
                               displayType={'text'}
                               thousandSeparator={true} prefix={'$'}/>
              </Col>
            </Row>{description(purchaseMedicine.medicine.description)}<Row>
              <Col><Button size={big ? '' : 'sm'} variant='light'
                           onClick={() => onRemove(purchaseMedicine.id)}><BsTrash/></Button></Col>
              <Col className='text-end'>&times;{purchaseMedicine.quantity}</Col>
            </Row>
              <hr className='my-2'/>
            </div>;
          }
      )}
    </Container>
    {typeof purchase !== 'undefined' && <Container>
      <Row>
        <Col style={{fontWeight: 'bold', fontSize: big ? '1.2rem' : '1rem'}}>TOTAL</Col>
        <Col xs={"auto"} className='text-end'>
          <NumericFormat style={{fontWeight: 'bold'}} value={total().toFixed(2)}
                         displayType={'text'}
                         thousandSeparator={true} prefix={'$'}/>
        </Col>
      </Row>
      {actions()}
    </Container>}
  </Stack>
}

export default ShoppingCart;