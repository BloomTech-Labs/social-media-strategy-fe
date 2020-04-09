import { makeStyles } from "@material-ui/core/styles";
import imgz from "../imgs/Rectangle.png";
import img2 from "../imgs/holdingwhitephone.png";

export const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  test: {
    display: "flex",
    alignItems: "center",
  },
  image: {
    backgroundImage: `url(${imgz})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  image2: {
    backgroundImage: `url(${img2})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "0 auto",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
