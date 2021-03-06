import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import axios from "axios";
import API_URL from "../helpers/apiurl";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  // const [loading, setLoading] = useState(true);

  const keepLogin = async () => {
    try {
      console.log(API_URL, "ini API");
      let token = Cookies.get("token");
      if (token) {
        let result = await axios.get(`${API_URL}/auth/keeplogin`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        dispatch({ type: "LOGIN", payload: result.data });
      }
      console.log(token);
    } catch (error) {
      console.log("error");
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    keepLogin();
  }, []);

  // if(loading){
  //   return  <div className="grid justify-center pt-44 bg-black min-h-screen">
  //             <div className="text-white flex flex-col items-center space-y-6">
  //               <div className="text-5xl font-bold pt-6 text-pinktertiary">Loading . . .</div>
  //             </div>
  //           </div>
  // }

  return children;
};

export default AuthProvider;
