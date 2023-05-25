import React, { useEffect, useState } from 'react';

import {
  CAvatar,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cilPeople,
} from '@coreui/icons';

import avatar1 from 'src/assets/images/avatars/1.jpg';
import avatar2 from 'src/assets/images/avatars/2.jpg';
import avatar3 from 'src/assets/images/avatars/3.jpg';
import avatar4 from 'src/assets/images/avatars/4.jpg';
import avatar5 from 'src/assets/images/avatars/5.jpg';
import avatar6 from 'src/assets/images/avatars/6.jpg';
import request from 'src/request';

const Dashboard = () => {
  const [cargos, setCargos] = useState([]);
  const [recievedCargos, setRecievedCargos] = useState([]);

  useEffect(() => {
    request
      .get('/cargo/getMySendedCargos')
      .then((response) => {
        setCargos(response.data?.data);
      })
      .catch((error) => {
        console.log(error.response?.data?.error?.message);
      });

    request
      .get('/cargo/getMyRecievedCargos')
      .then((response) => {
        setRecievedCargos(response.data?.data);
      })
      .catch((error) => {
        console.log(error.response?.data?.error?.message);
      });
  }, []);

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Gönderimler</CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell>Alıcı</CTableHeaderCell>
                    <CTableHeaderCell>İçerik</CTableHeaderCell>
                    <CTableHeaderCell>Kayıt Şube</CTableHeaderCell>
                    <CTableHeaderCell>Varış Şube</CTableHeaderCell>
                    <CTableHeaderCell>Durum</CTableHeaderCell>
                    <CTableHeaderCell>Gönderi Ücreti</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {cargos?.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell>
                        <div>
                          {item.sender?.name} {item.sender?.surname}
                        </div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>
                          {item.content}
                        </div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.registerBranch.name}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.targetBranch.name}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.status}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.totalPrice} TL</div>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
          <CCard className="mb-4">
            <CCardHeader>
              Bana Gelen & Gelecek Kargolar
            </CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell>Gönderici</CTableHeaderCell>
                    <CTableHeaderCell>İçerik</CTableHeaderCell>
                    <CTableHeaderCell>Kayıt Şube</CTableHeaderCell>
                    <CTableHeaderCell>Varış Şube</CTableHeaderCell>
                    <CTableHeaderCell>Durum</CTableHeaderCell>
                    <CTableHeaderCell>Gönderi Ücreti</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {recievedCargos?.map((item, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>
                        <div>
                          {item.sender?.name} {item.sender?.surname}
                        </div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>
                          {item.content}
                        </div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.registerBranch.name}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.targetBranch.name}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.status}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.totalPrice} TL</div>
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

export default Dashboard;
