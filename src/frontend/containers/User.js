import React from "react";

import Layout from "../components/Layout";
import AvailabilityForm from "../components/AvailabilityForm";

const LoginContainer = () => (
  <Layout heading="Bombeiros disponíveis" cardColor="grey">
    <AvailabilityForm />
  </Layout>
);

export default LoginContainer;
