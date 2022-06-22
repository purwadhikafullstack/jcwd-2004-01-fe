import { useSelector } from "react-redux";

const useProfile = () => {
  const profile = useSelector((state) => state.profile);

  return profile;
};

export default useProfile;
