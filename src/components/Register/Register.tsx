//import "./Register.css";
import { Form, Input, Button, Typography } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";

import { handleRegister } from "./handlers";
import { useForm } from "antd/lib/form/Form";
import { Link, useHistory } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "../../App";

interface FormValues {
  email: string;
  password: string;
}

function Register() {
  const auth = useContext(authContext);
  const history = useHistory();

  const onFinish = async (values: FormValues) => {
    const { email, password } = values;

    const result = await handleRegister(email, password);

    if (result.type === "FAILED") {
      if (result.field)
        form.setFields([{ name: result.field, errors: [result.message] }]);
      else form.setFields([{ name: "email", errors: [result.message] }]);

      return;
    }

    // SUCCESS
    history.push("/login");
  };

  const [form] = useForm();

  return (
    <div className="login-form-container">
      <Typography.Title>Register</Typography.Title>
      <Form className="login-form" form={form} onFinish={onFinish}>
        <Form.Item name="email" rules={[{ required: true }, { type: "email" }]}>
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Email"
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
            Register
          </Button>
          Or <Link to="/login">Log in now!</Link>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Register;
