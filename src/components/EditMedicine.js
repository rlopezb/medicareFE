import {Button, Form, Modal} from "react-bootstrap";
import {dispatch as emit} from "use-bus";
import React, {useState} from "react";
import {NumericFormat} from "react-number-format";
import {useSelector} from "react-redux";

function EditMedicine({medicine, show}) {
  const [newMedicine, setNewMedicine] = useState(medicine);
  const sellers = useSelector(state => state.sellers);

  const onCancel = () => emit({type: 'CANCEL'});
  const onSave = () => emit({type: 'SAVE', payload: newMedicine});

  const onChange = (event) => setNewMedicine((newMedicine) => {
    switch (event.target.id) {
      case 'stock':
      case 'price':
        return {
          ...newMedicine,
          [event.target.id]: +event.target.value
        }
      case 'enabled':
        return {
          ...newMedicine,
          [event.target.id]: !newMedicine.enabled
        }
      case 'seller.id':
        return {
          ...newMedicine,
          seller: sellers.find(seller => seller.id === +event.target.value)
        }

      default:
        return {
          ...newMedicine,
          [event.target.id]: event.target.value
        }
    }
  });

  return <Modal show={show} onHide={onCancel}>
    <Modal.Header closeButton>
      <Modal.Title>Medicine data</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label className="text-center">Name</Form.Label>
          <Form.Control id='name'
                        value={newMedicine.name}
                        type="text"
                        placeholder="Medicine name"
                        onChange={onChange}/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="text-center">Description</Form.Label>
          <Form.Control id='description'
                        value={newMedicine.description}
                        as="textarea" rows={3}
                        placeholder="Medicine description"
                        onChange={onChange}/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="text-center">Price</Form.Label>
          <NumericFormat id='price'
                         value={newMedicine.price}
                         thousandSeparator={true}
                         step='0.01'
                         type='number'
                         placeholder="Medicine price"
                         onChange={onChange}
                         className='form-control'/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="text-center">Stock</Form.Label>
          <NumericFormat id='stock'
                         value={newMedicine.stock}
                         thousandSeparator={true}
                         type='number'
                         placeholder="Medicine stock"
                         onChange={onChange}
                         className='form-control'/>
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label className="text-center">Seller</Form.Label>
          <Form.Select id='seller.id'
                       value={typeof newMedicine.seller !== 'undefined' ? newMedicine.seller.id : undefined}
                       onChange={onChange}>
            <option hidden value=''>Select...</option>
            {sellers.map(seller => {
              return <option key={seller.id} value={seller.id}>{seller.name}</option>;
            })}
          </Form.Select>
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label className="text-center">Enabled</Form.Label>
          <Form.Check id='enabled'
                      value={newMedicine.enabled}
                      checked={newMedicine.enabled}
                      type='switch'
                      onChange={onChange}/>
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onCancel}>
        Close
      </Button>
      <Button variant="primary" onClick={onSave}>
        Save Changes
      </Button>
    </Modal.Footer>
  </Modal>
}

export default EditMedicine;