import {Button, Card} from "react-bootstrap";
import {NumericFormat} from "react-number-format";
import React, {useState} from "react";
import {GrEdit, GrFormAdd, GrTrash} from "react-icons/gr";
import useBus, {dispatch as emit} from 'use-bus';
import {useSelector} from "react-redux";
import EditMedicine from "./EditMedicine";

function MedicineCard({medicine, role}) {
  const loading = useSelector(state => state.loading);
  const [show, setShow] = useState(false);

  useBus('CANCEL', () => setShow(false));
  useBus('SAVE', () => setShow(false));

  return <Card style={{width: '24rem', height: '18rem', border: 'none'}} className="medicineCard shadow m-4">
    <Card.Body className="d-flex flex-column">
      <Card.Title>{medicine.name}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">{medicine.seller.name}</Card.Subtitle>
      <Card.Text style={{maxHeight: '7.4rem', overflow: 'hidden'}}>
        {medicine.description}
      </Card.Text>
      <div className="mt-auto" style={{textAlign: "end", fontWeight: "bolder"}}>
        <Card.Text className="mb-1">
          <NumericFormat value={medicine.price.toFixed(2)}
                         displayType={'text'}
                         thousandSeparator={true} prefix={'$'}/>
        </Card.Text>
        {role === 'ROLE_ADMIN' && <Button className='me-2' disabled={loading} variant="light"
                                          onClick={() => setShow(true)}><GrEdit
            style={{marginBottom: "2px", marginRight: "4px"}}/>Edit</Button>
        }
        {role === 'ROLE_ADMIN' && <Button disabled={loading} variant="light"
                                          onClick={() =>  emit({type: 'DELETE', payload: medicine.id})}><GrTrash
            style={{marginBottom: "2px", marginRight: "4px"}}/>Delete</Button>
        }
        {role === 'ROLE_USER' && <Button disabled={loading} variant="light"
                                         onClick={() => emit({type: 'ADD_MEDICINE', payload: medicine.id})}><GrFormAdd
            style={{marginBottom: "1px", marginRight: "2px"}}/>Add to cart</Button>
        }
        {role === 'ROLE_ADMIN' && <EditMedicine medicine={medicine} show={show}></EditMedicine>}
      </div>
    </Card.Body>
  </Card>
}

export default MedicineCard;