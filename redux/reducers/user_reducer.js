const INITIAL_STATE = {
  id: 0,
  isLogin: false,
  is_verified: 0,
  role_id: 0,
  email: "",
  fullname: "",
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isLogin: true, error_mes: "", ...action.payload };
    case "CHECKOUT":
      return { ...state, ...action.payload };
    case "ERROR":
      return { error_mes: action.payload };
    case "LOGOUT":
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default userReducer;
