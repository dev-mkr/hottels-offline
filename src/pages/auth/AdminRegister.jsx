import AdminRegisterComponent from "../../layouts/auth/AdminRegisterComponent";

import Layout from "../../layouts/auth/Layout";

const Page = () => {
  return (
    <Layout>
      <AdminRegisterComponent
        roles={["account_owner", "hotel_director", "super_admin"]}
        url="/api/admin/register"
      />
    </Layout>
  );
};

export default Page;
