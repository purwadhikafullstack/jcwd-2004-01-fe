const initialState = {
  id: 0,
  fullname: "",
  username: "",
  email: "",
  profile_picture: "",
  phonenumber: "",
  gender: "",
  date_of_birth: "",
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_PROFILE":
      return { ...state, ...action.payload };
    case "PROFILE_ERROR":
      return { error_mes: action.payload };
    default:
      return state;
  }
};

export default profileReducer;
