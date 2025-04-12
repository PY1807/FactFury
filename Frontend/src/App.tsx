import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Home_without_Login } from './pages/Home_without_Login';
import { Dashboard } from './pages/Dashboard';
import { ReactNode } from 'react';
import { Publish } from './pages/Publish';
import { All_false } from './pages/All_false';
import { Hashtag } from './pages/Hashtag';
import { Search } from './pages/Search';
import { Verify } from './pages/Verify';
import { Deepfake_Detection } from './pages/Deepfake_Detection';
import { Transcript_verify } from './pages/Transcript_verify';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/signin' element={<Signin />}></Route>
          <Route path='/' element={<Home_without_Login />}></Route>
          <Route path='/search' element={<Search />}></Route>
          <Route path='/dashboard' element={
            <ProtectedRoute> 
              <Dashboard />
            </ProtectedRoute>
          }></Route>
          <Route path='/publish' element={
            <ProtectedRoute>
              <Publish />
            </ProtectedRoute>
          }></Route>
          <Route path='/false' element={
            <ProtectedRoute>
              <All_false />
            </ProtectedRoute>
          }></Route>
          <Route path='/hashtag' element={
            <ProtectedRoute>
              <Hashtag />
            </ProtectedRoute>
          }></Route>
          <Route path='/verify' element={
            <ProtectedRoute>
              <Verify />
            </ProtectedRoute>
          }></Route>
          <Route path='/deepfake_detection' element={
            <ProtectedRoute>
              <Deepfake_Detection />
            </ProtectedRoute>
          }></Route>
          <Route path='/transcript_verification' element={
            <ProtectedRoute>
              <Transcript_verify />
            </ProtectedRoute>
          }></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
