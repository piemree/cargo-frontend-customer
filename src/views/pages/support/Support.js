import React, { useEffect, useState } from 'react';

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormSelect,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';

import request from 'src/request';
import { func } from 'prop-types';

const Support = () => {
  const [cargoList, setCargoList] = useState([]);
  const [ticket, setTicket] = useState(null);
  const [myTickets, setMyTickets] = useState([]);

  function formCreateTicket(e) {
    e.preventDefault();

    request
      .post('/ticket/create', ticket)
      .then((response) => {
        console.log(response.data?.data);
        setTicket(null);
        getMyTickets();
        alert('Destek talebi oluşturuldu');
      })
      .catch((error) => {
        alert('Destek talebi oluşturulamadı');
        console.log(error.response?.data?.error?.message);
      });
  }

  function getMyTickets() {
    request
      .get('/ticket/getMyTickets')
      .then((response) => {
        console.log(response.data?.data);
        setMyTickets(response.data?.data);
      })
      .catch((error) => {
        console.log(error.response?.data?.error?.message);
      });
  }
  async function getCargos() {
    const [sended, recieved] = await Promise.all([
      request.get('/cargo/getMySendedCargos'),
      request.get('/cargo/getMyRecievedCargos'),
    ]);

    const tickets = [...sended.data?.data, ...recieved.data?.data];
    setCargoList(tickets);
  }
  useEffect(() => {
    getCargos();
    getMyTickets();
  }, []);

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Destek Talebi Oluştur</CCardHeader>
            <CCardBody>
              <CForm onSubmit={formCreateTicket}>
                <CRow>
                  <CCol xs="12">
                    <CRow>
                      <CCol xs="12" md="6">
                        <div className="mb-3">
                          <label className="form-label" htmlFor="name">
                            Başlık
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            onChange={(e) =>
                              setTicket({ ...ticket, title: e.target.value })
                            }
                          />
                        </div>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol xs="12" md="6">
                        <div className="mb-3">
                          <label className="form-label" htmlFor="name">
                            Konu
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            onChange={(e) =>
                              setTicket({ ...ticket, subject: e.target.value })
                            }
                          />
                        </div>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol xs="12" md="6">
                        <div className="mb-3">
                          <label className="form-label" htmlFor="name">
                            Mesaj
                          </label>
                          <textarea
                            className="form-control"
                            type="text"
                            onChange={(e) =>
                              setTicket({ ...ticket, message: e.target.value })
                            }
                          />
                        </div>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol xs="12" md="6">
                        <div className="mb-3">
                          <label className="form-label" htmlFor="name">
                            Kargo
                          </label>
                          <CFormSelect
                            aria-label="Default select example"
                            onChange={(e) =>
                              setTicket({ ...ticket, cargo: e.target.value })
                            }
                          >
                            <option>Kargolar</option>
                            {cargoList.map((item, index) => (
                              <option key={index} value={item._id}>
                                {item.content}
                              </option>
                            ))}
                          </CFormSelect>
                        </div>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol xs="12" md="6">
                        <CButton type="submit" color="primary">
                          Oluştur
                        </CButton>
                      </CCol>
                    </CRow>
                  </CCol>
                </CRow>
              </CForm>
            </CCardBody>
          </CCard>
          <CCard className="mb-4">
            <CCardHeader>Destek Taleplerim</CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell>Başlık</CTableHeaderCell>
                    <CTableHeaderCell>Konu</CTableHeaderCell>
                    <CTableHeaderCell>Durum</CTableHeaderCell>
                    <CTableHeaderCell
                      style={{ width: '200px' }}
                    ></CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {myTickets.map((item, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>
                        <div>{item.title}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.subject}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.status}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color="primary"
                          to={`/support/${item._id}`}
                          href={`/support/${item._id}`}
                        >
                          Detay
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Support;
