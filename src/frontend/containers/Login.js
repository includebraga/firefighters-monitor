import React from "react";

import Layout from "../components/Layout";
import LoginForm from "../components/LoginForm";

const LoginContainer = () => (
  <Layout heading="Bem vindo" cardColor="grey">
    <LoginForm />
  </Layout>
);

export default LoginContainer;
