import RegisterComponent from "../../layouts/auth/RegisterComponent";

import Layout from "../../layouts/auth/Layout";

const Page = () => {
  return (
    <Layout>
      <RegisterComponent roles={["Agent", "client", "Traveler", "dmc"]} url="/api/user/register" />
    </Layout>
  );
};

export default Page;
