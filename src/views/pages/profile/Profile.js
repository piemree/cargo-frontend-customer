import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormLabel,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';
import { useGlobals } from 'src/hooks/useGlobals';
import jwt_decode from 'jwt-decode';
import request from 'src/request';

const Profile = () => {
  const [state, setState] = useState({
    email: '',
    tcNo: '',
    phone: '',
  });

  async function handleSubmit(e) {
    e.preventDefault();
    const cnfrm = window.confirm('Kaydetmek istediğinize emin misiniz?');
    if (!cnfrm) return;
    request
      .post('/auth/updateCustomer', state)
      .then((res) => {
        if (res.data.success) {
          setState(res.data.data);
          alert('Güncelleme başarılı');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    request
      .get('/auth/customer/getProfile')
      .then((res) => {
        if (res.data.success) {
          setState(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h2 className="mb-4">Giriş Yap</h2>
                    <CFormLabel>Email</CFormLabel>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Email"
                        value={state?.email}
                        onChange={(e) =>
                          setState({ ...state, email: e.target.value })
                        }
                      />
                    </CInputGroup>
                    <CFormLabel>Telefon Numarası</CFormLabel>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Telefon Numarası"
                        value={state?.phone}
                        onChange={(e) =>
                          setState({ ...state, phone: e.target.value })
                        }
                      />
                    </CInputGroup>
                    <CFormLabel>TC Kimlik Numarası</CFormLabel>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="TC Kimlik Numarası"
                        value={state?.tcNo}
                        onChange={(e) =>
                          setState({ ...state, tcNo: e.target.value })
                        }
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol>
                        <CButton type="submit" className="px-4">
                          Güncelle
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Profile;
