import { Button } from "react-bootstrap";
import { useHistory } from "react-router";

const BackButton = () => {
  const history = useHistory();
  const handleBack = () => {
    history.push("/");
  };
  return <Button onClick={handleBack}>Volver</Button>;
};

export default BackButton;
