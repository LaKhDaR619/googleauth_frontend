import "./Login.css";
import { Form, Input, Button, Typography, Alert } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";

import { handleLogin } from "./handlers";
import { useForm } from "antd/lib/form/Form";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "../../App";

interface FormValues {
  username: string;
  password: string;
}

function Login() {
  const { auth, authDispatch } = useContext(authContext);
  const [form] = useForm();

  const onFinish = async (values: FormValues) => {
    const { username, password } = values;

    const result = await handleLogin(username, password);

    if (result.type === "FAILED") {
      // if the server sent the field with the error
      if (result.field)
        form.setFields([{ name: result.field, errors: [result.message] }]);
      // unkown error
      else {
        authDispatch({ type: "set_error", error: result.message });
        setTimeout(() => authDispatch({ type: "clear_error" }), 3000);
      }

      return;
    }

    console.log(result);

    // SUCCESS
    authDispatch({ type: "login" });
  };

  const handleGoogle = async () => {
    console.log("google");

    const res = await fetch("/auth/google");

    if (res.status === 200) {
      try {
        const result = await res.json();

        window.location.href = result.url;
      } catch ({ message }) {
        console.error(message);
      }
    }
    console.log(res);
  };

  return (
    <div className="login-form-container">
      <Typography.Title>Login</Typography.Title>
      <Form className="login-form" form={form} onFinish={onFinish}>
        <Form.Item name="username" rules={[{ required: true }, { min: 3 }]}>
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="User Name"
            autoComplete="off"
          />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true }, { min: 3 }]}>
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            autoComplete="off"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or <Link to="/register">register now!</Link>
        </Form.Item>
        {auth.error && <Alert message={auth.error} type="error" />}
      </Form>
      <button onClick={handleGoogle}>Google</button>
    </div>
  );
}

export default Login;
