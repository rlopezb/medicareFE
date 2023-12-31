import {Button, Col, Form, Row} from 'react-bootstrap';
import React, {useCallback, useEffect, useState} from 'react';
import {NumericFormat} from 'react-number-format';
import api from '../api/api';
import {toast} from 'react-toastify';
import {dispatch as emit} from 'use-bus';
import {BsSearch, BsXLg} from "react-icons/bs";
import {useDispatch, useSelector} from "react-redux";

function SideBar() {
  let dispatch = useDispatch();
  const [max, setMax] = useState(0);
  const [filter, setFilter] = useState({search: '', price: '', seller: '', sort: '', descending: false})
  const sellers = useSelector(state => state.sellers);

  let onClear = () => {
    setFilter({search: '', price: '', seller: '', sort: '', descending: false});
    emit({type: 'SEARCH', payload: {search: '', price: '', seller: '', sort: '', descending: false}});
  }

  let getSellers= useCallback(() =>  {
    api.get('/seller')
        .then(response => {
          dispatch({type: 'SET_SELLERS', payload: [...response.data]});
        })
        .catch(error => {
          console.log(error);
          toast.error(error.message);
        });
  },[dispatch]);

  let getMax = () => {
    api.get('/medicine/max')
        .then(response => {
          setMax(response.data);
        })
        .catch(error => {
          console.log(error);
          toast.error(error.message);
        });
  }

  useEffect(() => getSellers(), [getSellers]);
  useEffect(() => getMax(), []);

  return <div className="sticky-top">
    <h2 className='mt-3'>Filters</h2>
    <Form style={{width: '24rem'}} className='mt-3'>
      <Row>
        <Form.Group className='mb-3'>
          <Form.Label style={{fontWeight: 'bolder'}}>Search</Form.Label>
          <Form.Control name='search' type='search' placeholder='Search' className='me-2' aria-label='Search'
                        value={filter.search}
                        onChange={(event) => setFilter((prevFilter) => ({...prevFilter, search: event.target.value}))}/>
        </Form.Group>
      </Row>
      <Row>
        <Form.Group className='mb-3'>
          <Form.Label style={{fontWeight: 'bolder'}}>Max price</Form.Label> - <NumericFormat
            value={typeof filter.price === 'number' ? filter.price.toFixed(0) : ''}
            displayType={'text'}
            thousandSeparator={true} prefix={'$'}/>
          <Form.Range value={filter.price} max={max + 1} min={0}
                      onChange={(event) => setFilter((prevFilter) => ({...prevFilter, price: +event.target.value}))}/>
        </Form.Group>
      </Row>
      <Row>
        <Form.Group className='mb-3'>
          <Form.Label style={{fontWeight: 'bolder'}}>Seller</Form.Label>
          <Form.Select value={filter.seller}
                       onChange={(event) => setFilter((prevFilter) => ({...prevFilter, seller: event.target.value}))}>
            <option hidden value=''>Select...</option>
            {Array.isArray(sellers) && sellers.map(seller => {
              return <option key={seller.id} value={seller.id}>{seller.name}</option>;
            })}
          </Form.Select>
        </Form.Group>
      </Row>
      <Row>
        <Col>
          <Form.Group className='mb-3'>
            <Form.Label style={{fontWeight: 'bolder'}}>Sort by</Form.Label>
            <Form.Select value={filter.sort}
                         onChange={(event) => setFilter((prevFilter) => ({...prevFilter, sort: event.target.value}))}>
              <option hidden value=''>Select...</option>
              <option value='name'>Name</option>
              <option value='seller'>Seller</option>
              <option value='description'>Description</option>
              <option value='price'>Price</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className='mb-3'>
            <Form.Label style={{fontWeight: 'bolder'}}>{filter.descending ? 'Decending' : 'Ascending'}</Form.Label>
            <Form.Check type='switch' checked={filter.descending}
                        onChange={() => setFilter((prevFilter) => ({
                          ...prevFilter,
                          descending: !prevFilter.descending
                        }))}/>
          </Form.Group>
        </Col>
      </Row>
      <Button onClick={() => emit({type: 'SEARCH', payload: filter})}><BsSearch className='me-2 mb-1'/>Search</Button>
      <Button className="ms-2" variant="secondary" onClick={onClear}><BsXLg className='me-2 mb-1'/>Clear all</Button>
    </Form>
  </div>
}

export default SideBar;