import Link from "next/link";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Image from "next/image";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    background: {
      default: "#f5f5f5",
    },
  },
});
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
    <div>
      <MuiThemeProvider theme={theme}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Rick and Morty Application
            </Typography>
            <Button color="inherit">
              <Link href="/characters">
                <a
                  style={{
                    textDecoration: "none",
                    color: "white",
                    fontSize: "17px",
                    float: "right",
                  }}
                >
                  Characters
                </a>
              </Link>
            </Button>
            <Button color="inherit">
              <Link href="/episodes">
                <a
                  style={{
                    textDecoration: "none",
                    color: "white",
                    fontSize: "18px",
                    float: "right",
                  }}
                >
                  Episodes
                </a>
              </Link>
            </Button>
          </Toolbar>
        </AppBar>
        <Container>
          <Image
            src="https://i.guim.co.uk/img/media/b563ac5db4b4a4e1197c586bbca3edebca9173cd/0_12_3307_1985/master/3307.jpg?width=1300&quality=85&auto=format&fit=max&s=c641b7acb6a697bb90d7634b89845cfa"
            width={2000}
            height={1200}
            padding={0}
          />
        </Container>
      </MuiThemeProvider>
    </div>
  );
}

export default Home;
