type Result =
  | { type: "SUCCESS" }
  | { type: "FAILED"; field?: string; message: string };

export const handleLogin = async (
  username: string,
  password: string
): Promise<Result> => {
  try {
    const res = await fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    console.log(res);

    const result = await res.json();
    console.log(result);

    const { field, message } = result;

    if (res.status === 200) {
      localStorage.setItem("auth", JSON.stringify(result));
      return { type: "SUCCESS" };
    }

    return { type: "FAILED", field, message };
  } catch ({ message }) {
    console.error(message);
    return { type: "FAILED", message };
  }
};
