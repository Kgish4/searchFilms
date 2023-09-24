import { Button, Layout } from "antd";
import { signInWithGoogle } from "../firebase/config";

const Login = () => {
  const singIn = () => {
    signInWithGoogle();
  };

  return (
    <Layout.Content
      style={{
        padding: "20px",
        width: "100%",
        display: "flex",
        alignItems: "center",
        height: "100vh",
        justifyContent: "center",
      }}
    >
      <Button onClick={singIn} type="primary" htmlType="submit">
        Login with google
      </Button>
    </Layout.Content>
  );
};

export default Login;
