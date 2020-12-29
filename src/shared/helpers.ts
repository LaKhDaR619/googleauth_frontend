export const fethWithToken = async (
  input: RequestInfo,
  init?: RequestInit
): Promise<Response> => {
  const auth = localStorage.getItem("auth");
  if (!auth) throw new Error("No Token Found !!");
  const token = JSON.parse(auth).token;
  if (!token) throw new Error("No Token Found !!");

  const res = await fetch(input, {
    ...init,
    headers: { authorization: `Bearer ${token}` },
  });

  // if we should refresh the token (we have two casses)
  // case 1 the access token isn't expired yet
  if (
    res.headers.get("new-access-token") &&
    res.headers.get("new-refresh-token")
  ) {
    const newToken = res.headers.get("new-access-token");
    const newRefreshToken = res.headers.get("new-refresh-token");

    localStorage.setItem(
      "auth",
      JSON.stringify({ token: newToken, refreshToken: newRefreshToken })
    );
  }
  // case 2 already expired so we have to hit /auth/token route and send our refresh token
  if (res.headers.get("should-refresh-tokens")) {
    const result = await refreshTheTokens(input, init || {});
    if (result !== null) return result;
  }

  return res;
};

const refreshTheTokens = async (
  input: RequestInfo,
  init?: RequestInit
): Promise<Response | null> => {
  const auth = localStorage.getItem("auth");
  if (!auth) throw new Error("No Token Found !!");
  const token = JSON.parse(auth).refreshToken;
  if (!token) throw new Error("No Token Found !!");

  try {
    const res = await fetch("/auth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    if (res.status === 200) {
      const newAuth = await res.json();
      localStorage.setItem("auth", JSON.stringify(newAuth));

      // if everything went well, we try the request again
      return await fethWithToken(input, init || {});
    }
  } catch ({ message }) {
    console.error(message);
  }

  return null;
};
