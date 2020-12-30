import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function GoogleCallback() {
  const location = useLocation();

  useEffect(() => {
    console.log("useEffect");

    const handleCallback = async () => {
      const pathname = location.pathname;
      const search = location.search;
      const res = await fetch(`/auth${pathname}${search}`);

      if (res.status === 200) {
        const result = await res.json();
        localStorage.setItem("auth", JSON.stringify(result));
        window.location.href = "/";
      }
      console.log(res);
    };

    //
    handleCallback();
  }, [location]);

  return <div>Loading...</div>;
}

export default GoogleCallback;
