import RegisterComponent from "../../layouts/auth/RegisterComponent";

import Layout from "../../layouts/auth/Layout";

const Page = () => {
  return (
    <Layout>
      <RegisterComponent
        roles={["account_owner", "hotel_director", "super_admin"]}
        url="/api/admin/register"
      />
    </Layout>
  );
};

export default Page;
