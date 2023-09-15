import {useDispatch, useSelector} from "react-redux";
import React, {useCallback, useEffect, useState} from "react";
import useBus from "use-bus";
import api from "../api/api";
import {toast} from "react-toastify";
import DefaultLayout from "../layouts/DefaultLayout";
import {Button, Col, Container, Row} from "react-bootstrap";
import SideBar from "../components/SideBar";
import MedicineCard from "../components/MedicineCard";
import EditMedicine from "../components/EditMedicine";
import {FaPlus} from "react-icons/fa";

function Admin() {
  let dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const loading = useSelector(state => state.loading);
  const [show, setShow] = useState(false);
  const emptyMedicine = {
    name: undefined,
    description: undefined,
    price: undefined,
    quantity: undefined,
    enabled: true,
    stock: undefined,
    seller: {
      id: undefined,
      name: undefined
    }
  };
  let [medicines, setMedicines] = useState([]);
  let [page, setPage] = useState(0);
  let [last, setLast] = useState(false);
  let [filter, setFilter] = useState({});
  useBus('SEARCH', (action) => onSearch(action.payload), [filter, medicines, page]);
  useBus('SAVE', (action) => onSave(action.payload), [medicines]);
  useBus('DELETE', (action) => onDelete(action.payload), [medicines]);
  useBus('CANCEL', () => setShow(false));

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

  const onMore = () => {
    setPage(page + 1);
  };

  const onSearch = (newFilter) => {
    setMedicines([]);
    setPage(0);
    setFilter(newFilter);
  };

  const onSave = (newMedicine) => {
    dispatch({type: 'SET_LOADING', payload: true});
    setShow(false);
    if (typeof newMedicine.id === 'undefined') {
      api.post('/medicine', newMedicine)
          .then(() => {
            toast.success('Medicine added successfully');
            onSearch({});
            dispatch({type: 'SET_LOADING', payload: false});
          })
          .catch(error => {
            console.log(error);
            toast.error(error.message);
            dispatch({type: 'SET_LOADING', payload: false});
          });

    } else {
      api.put('/medicine', newMedicine)
          .then(() => {
            toast.success('Medicine with id ' + newMedicine.id + ' updated successfully');
            const medicineIndex = medicines.findIndex((medicine) => medicine.id === newMedicine.id);
            const postMedicines = [...medicines];
            postMedicines[medicineIndex] = newMedicine;
            setMedicines(() => [...postMedicines]);
            dispatch({type: 'SET_LOADING', payload: false});
          })
          .catch(error => {
            console.log(error);
            toast.error(error.message);
            dispatch({type: 'SET_LOADING', payload: false});
          });
    }
  };

  const onDelete = (id) => {
    dispatch({type: 'SET_LOADING', payload: true});
    api.delete('/medicine/' + id)
        .then(() => {
          toast.warn('Medicine with id ' + id + ' deleted successfully');
          const medicineIndex = medicines.findIndex((medicine) => medicine.id === id);
          const postMedicines = [...medicines];
          postMedicines.splice(medicineIndex, 1);
          setMedicines(() => [...postMedicines]);
          dispatch({type: 'SET_LOADING', payload: false});
        })
        .catch(error => {
          console.log(error);
          toast.error(error.message);
          dispatch({type: 'SET_LOADING', payload: false});
        });
  };

  const onNew = () => {
    setShow(true);
  };

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
                    <MedicineCard medicine={medicine} role={user.role}></MedicineCard>
                  </Col>
              )}
            </Row>
            <Row className='justify-content-start row-cols-auto'>
              <Col className='text-center'>
                <Button variant='dark' className={last ? 'invisible' : 'visible'} disabled={loading || last}
                        onClick={onMore}>{loading ? 'Loading' : 'Load more'}</Button>
              </Col>
              <Col className='text-center'>
                <Button variant='dark' disabled={loading}
                        onClick={onNew}>
                  <FaPlus
                      style={{marginBottom: "2px", marginRight: "4px", fill: 'white'}}/>New medicine</Button>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
    {user.role === 'ROLE_ADMIN' && <EditMedicine medicine={emptyMedicine} show={show}></EditMedicine>}
  </DefaultLayout>
}

export default Admin;