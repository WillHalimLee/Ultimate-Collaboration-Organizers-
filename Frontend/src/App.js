const App = () => {
  const { isAuthenticated, userRole } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/app" /> : <LoginPage />} />
        <Route path="/app" element={isAuthenticated ? <MainApp userRole={userRole} /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};
