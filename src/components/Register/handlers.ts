type Result =
  | { type: "SUCCESS"; token: string }
  | { type: "FAILED"; field?: string; message: string };

export const handleRegister = async (
  email: string,
  password: string
): Promise<Result> => {
  try {
    const res = await fetch("/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await res.json();
    const { field, message } = result;

    if (res.status === 201) {
      return { type: "SUCCESS", token: result.roken };
    }

    return { type: "FAILED", field, message };
  } catch ({ message }) {
    console.error(message);
    return { type: "FAILED", message };
  }
};
