import { Button } from "react-bootstrap";
import { useHistory } from "react-router";
import { IoIosArrowBack } from "react-icons/io";
import "../../style/BackButton.css";

const BackButton = () => {
  const history = useHistory();
  const handleBack = () => {
    history.push("/");
  };
  return (
    <Button variant="outline-primary" id="BackButton" onClick={handleBack}>
      <IoIosArrowBack />
    </Button>
  );
};

export default BackButton;
