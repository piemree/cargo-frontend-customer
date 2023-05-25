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
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';
import { useGlobals } from 'src/hooks/useGlobals';
import jwt_decode from 'jwt-decode';
import request from 'src/request';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const global = useGlobals();
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const result = await request.post('/auth/customer/login', {
        email: username,
        tcNo: username,
        password,
      });
      if (result.data.success) {
        localStorage.setItem('token', result.data.token);
        const decoded = jwt_decode(result.data.token);
        global.setToken(result.data.token);
        global.setUser(decoded);
        navigate('/dashboard');
      }
    } catch (error) {
      global.setUser(null);
      alert('Giriş başarısız oldu.');
      console.log(error);
    }
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleLogin}>
                    <h2 className="mb-4">Giriş Yap</h2>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Email veya TC Kimlik No"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Şifre"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={3}>
                        <CButton type="submit" color="primary" className="px-4">
                          Giriş
                        </CButton>
                      </CCol>
                      <CCol xs={9} className="d-flex justify-content-end">
                        <Link
                          color="link"
                          className="px-0 mx-2"
                          target="_blank"
                          to={
                            process.env.REACT_APP_API_URL +
                            '/api/auth/customerForgotPassword'
                          }
                        >
                          Şifremi Unuttum
                        </Link>
                        <Link color="link" className="px-0" to="/register">
                          Kayıt Ol
                        </Link>
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

export default Login;
