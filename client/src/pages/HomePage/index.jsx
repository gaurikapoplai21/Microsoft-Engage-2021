import { useEffect } from "react";
import { pageTitles } from "../../constants/app";

// helper functions
import { setWindowTitle } from "../../utils/misc";

const HomePage = () => {
  useEffect(() => {
    setWindowTitle(pageTitles.HOME);
  }, []);
  return <div>Home Page</div>;
};

export default HomePage;
