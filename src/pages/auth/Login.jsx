import LoginComponent from "../../layouts/auth/LoginComponent";
import Layout from "../../layouts/auth/Layout";

const Page = () => {
  return (
    <Layout>
      <LoginComponent url="/api/user/login" />
    </Layout>
  );
};

export default Page;
