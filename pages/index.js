import Link from "next/link";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Home() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Rick and Morty Application
          </Typography>
          <Button color="inherit">
            <Link href="/characters">
              <a style={{ textDecoration: "none", color: "white" }}>
                Characters
              </a>
            </Link>
          </Button>
          <Button color="inherit">
            <Link href="/episodes">
              <a style={{ textDecoration: "none", color: "white" }}>Episodes</a>
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Home;
