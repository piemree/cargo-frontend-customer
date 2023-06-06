import React, { useEffect, useState } from 'react';

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
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
import { useParams } from 'react-router-dom';
import { useGlobals } from 'src/hooks/useGlobals';

const SupportDetail = () => {
  const [ticket, setTicket] = useState(null);
  const [message, setMessage] = useState('');
  const { id } = useParams();
  const { getUser } = useGlobals();
  const user = getUser();

  function sendMessage(e) {
    e.preventDefault();
    if (ticket?.status === 'closed')
      return alert('Bilet kapalı olduğu için mesaj gönderemezsiniz');
    request
      .post(`/ticket/sendMessage/${id}`, { message })
      .then((response) => {
        console.log(response.data?.data);
        setMessage('');
        getTicket();
      })
      .catch((error) => {
        console.log(error.response?.data?.error?.message);
      });
  }

  function getTicket() {
    request
      .get(`/ticket/getTicket/${id}`)
      .then((response) => {
        console.log(response.data?.data);
        setTicket(response.data?.data);
      })
      .catch((error) => {
        console.log(error.response?.data?.error?.message);
      });
  }

  function closeTicket() {
    // ask for confirmation
    if (!window.confirm('Bileti kapatmak istediğinize emin misiniz?')) return;
    request
      .post(`/ticket/closeTicket/${id}`)
      .then((response) => {
        console.log(response.data?.data);
        getTicket();
      })
      .catch((error) => {
        console.log(error.response?.data?.error?.message);
      });
  }

  useEffect(() => {
    getTicket();
  }, []);

  return (
    <>
      <CRow>
        <CCol xs>
          <CRow className="p-2">
            <CCol xs="12" align="end">
              <CButton color="primary" onClick={closeTicket}>
                Bileti Kapat
              </CButton>
            </CCol>
          </CRow>
          <CCard className="mb-4">
            <CCardHeader>
              <h4 className="mb-0">Bilet Detayı</h4>
              {ticket?.cargo?._id && (
                <div className="small text-muted">
                  <strong>Kargo ID:</strong> {ticket?.cargo?._id}
                </div>
              )}
            </CCardHeader>
            <CCardBody>
              {ticket?.messages?.map((message) => (
                <CRow className="p-2" key={message?._id}>
                  <CCol
                    xs="12"
                    align={message?.sender === 'customer' ? 'end' : 'start'}
                  >
                    {console.log(message)}
                    <CButton
                      key={message?._id}
                      color={
                        message?.sender === 'customer' ? 'primary' : 'secondary'
                      }
                      disabled
                    >
                      {message?.message}
                    </CButton>
                  </CCol>
                </CRow>
              ))}
              <CForm onSubmit={sendMessage}>
                <CRow>
                  <CCol xs="10">
                    {/* message input */}
                    <CFormInput
                      id="message"
                      placeholder="Mesajınızı giriniz"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </CCol>
                  <CCol xs="2">
                    {/* send button */}
                    <CButton
                      type="submit"
                      color="primary"
                      disabled={ticket?.status === 'closed'}
                    >
                      Gönder
                    </CButton>
                  </CCol>
                </CRow>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default SupportDetail;
