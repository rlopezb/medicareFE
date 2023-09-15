import {Card, Col, Container, Row} from "react-bootstrap";
import moment from 'moment';
import {NumericFormat} from "react-number-format";

function OrderCard({order}) {
  const total = () => {
    if (typeof order !== 'undefined') {
      let total = 0;
      order.purchaseMedicines.forEach(purchaseMedicine => total = total + purchaseMedicine.quantity * purchaseMedicine.price);
      return total;
    }
    return '';
  }

  return <Card style={{border: 'none'}} className="shadow m-4">
    <Card.Body>
      <Card.Title>Order ID {order.id}</Card.Title>
      <Card.Text>
        <h6 className='mb-0 mt-2'>Created</h6><span>{moment(order.created).format('lll')}</span>
        {order.payed !== null &&
            <div><h6 className='mb-0 mt-2'>Payed</h6><span>{moment(order.payed).format('lll')}</span></div>}
        {order.cancelled !== null &&
            <div><h6 className='mb-0 mt-2'>Cancelled</h6><span>{moment(order.cancelled).format('lll')}</span></div>}
      </Card.Text>
      <Container>
        <div className='h5 my-2'>Medicines</div>
        {typeof order !== 'undefined' && order.purchaseMedicines.map(purchaseMedicine => {
              return <div key={purchaseMedicine.id}><Row>
                <Col style={{fontWeight: 'bold', fontSize: '1rem'}}>{purchaseMedicine.medicine.name}</Col>
                <Col xs="auto" className='text-end'>
                  <NumericFormat value={purchaseMedicine.price.toFixed(2)}
                                 displayType={'text'}
                                 thousandSeparator={true} prefix={'$'}/>
                </Col>
              </Row>
                <Row>
                  <Col>{purchaseMedicine.medicine.description} </Col>
                  <Col xs='auto' className='text-end'>&times;{purchaseMedicine.quantity}</Col>
                </Row>
                <hr className='my-2'/>
              </div>;
            }
        )}
        {typeof order !== 'undefined' && <Row>
          <Col style={{fontWeight: 'bold', fontSize: '1rem'}}>TOTAL</Col>
          <Col xs={"auto"} className='text-end'>
            <NumericFormat style={{fontWeight: 'bold'}} value={total().toFixed(2)}
                           displayType={'text'}
                           thousandSeparator={true} prefix={'$'}/>
          </Col>
        </Row>}
      </Container>
    </Card.Body>
  </Card>
}

export default OrderCard;