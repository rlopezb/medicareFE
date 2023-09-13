import {Button, Card} from "react-bootstrap";
import {NumericFormat} from "react-number-format";
import React from "react";
import {GrFormAdd} from "react-icons/gr";
import {dispatch as emit} from 'use-bus';
import {useSelector} from "react-redux";

function MedicineCard({medicine}) {
  const loading = useSelector(state => state.loading);

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
        <Button disabled={loading} variant="light" onClick={() => emit({type: 'ADD_MEDICINE', payload: medicine.id})}><GrFormAdd
            style={{marginBottom: "1px", marginRight: "2px"}}/>Add to cart</Button>
      </div>
    </Card.Body>
  </Card>
}

export default MedicineCard;