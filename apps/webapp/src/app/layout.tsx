import React, { useEffect } from 'react';
import Navbar from './components/navbar';
import { Outlet } from 'react-router-dom';
import { useAuthStore } from './hooks/stores/useAuth';

export default function Layout() {
  const isLoggedIn = useAuthStore((state) => state.isAuthenticated);
  const attemptLogin = useAuthStore((state) => state.attemptLogin);

  useEffect(() => {
    if (!isLoggedIn) {
      attemptLogin();
    }
  }, [attemptLogin, isLoggedIn]);

  return (
    <>
      <Navbar />
      <main className="mx-24">
        <Outlet />
      </main>
    </>
  );
}
