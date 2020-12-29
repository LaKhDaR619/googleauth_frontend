import React, { useEffect } from "react";
import { fethWithToken } from "../../shared/helpers";

function Main() {
  useEffect(() => {
    fethWithToken("/posts", { method: "GET" });
  }, []);

  return <div>Main</div>;
}

export default Main;
