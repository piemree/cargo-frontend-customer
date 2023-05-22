import React, { useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser, cilPhone } from '@coreui/icons';
import { Link, useNavigate } from 'react-router-dom';
import request from 'src/request';

const Register = () => {
  const [state, setState] = useState({
    name: '',
    surname: '',
    email: '',
    tcNo: '',
    phone: '',
    password: '',
  });
  const [password2, setPassword2] = useState('');
  const navigate = useNavigate();

  const onFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await request.post('/auth/customer/register', state);
      if (result.data.success) {
        alert('Kayıt Başarılı');
        navigate('/login');
      }
    } catch (error) {
      alert('Kayıt Başarısız');
      console.log(error);
    }
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={onFormSubmit}>
                  <h2 className="mb-4">Kayıt Ol</h2>
                  <CInputGroup className="mb-3">
                    <CFormInput
                      placeholder="Ad"
                      valid={state.name.length > 0}
                      value={state.name}
                      onChange={(e) =>
                        setState({ ...state, name: e.target.value })
                      }
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CFormInput
                      placeholder="Soyad"
                      valid={state.surname.length > 0}
                      value={state.surname}
                      onChange={(e) =>
                        setState({ ...state, surname: e.target.value })
                      }
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="TC Kimlik No"
                      valid={state.tcNo.length === 11}
                      value={state.tcNo}
                      onChange={(e) =>
                        setState({ ...state, tcNo: e.target.value })
                      }
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>+90</CInputGroupText>
                    <CFormInput
                      placeholder="Telefon Numarası"
                      valid={state.phone.length === 10}
                      value={state.phone}
                      onChange={(e) =>
                        setState({ ...state, phone: e.target.value })
                      }
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      autoComplete="email"
                      valid={state.email.length > 0}
                      value={state.email}
                      onChange={(e) =>
                        setState({ ...state, email: e.target.value })
                      }
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      valid={
                        state.password.length >= 6 &&
                        state.password.length <= 16
                      }
                      value={state.password}
                      onChange={(e) =>
                        setState({ ...state, password: e.target.value })
                      }
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                      valid={
                        state.password === password2 &&
                        password2.length >= 6 &&
                        password2.length <= 16
                      }
                      value={password2}
                      onChange={(e) => setPassword2(e.target.value)}
                    />
                  </CInputGroup>
                  <CRow>
                    <CCol xs={6}>
                      <CButton type="submit" color="primary" className="px-4">
                        Kayıt
                      </CButton>
                    </CCol>
                    <CCol className="d-flex justify-content-end">
                      <Link color="link" className="px-0" to="/login">
                        Giriş Yap
                      </Link>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Register;
