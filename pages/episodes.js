import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Head from "next/head";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
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
    maxWidth: 300,
    justifyContent: "center",
    alignItems: "center",
    padding: "30px",
    margin: "auto",
    marginTop: "40px",
  },
  MuiTypography: {
    align: "center",
  },
}));

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: "https://rickandmortyapi.com/graphql/",
    cache: new InMemoryCache(),
  });
  const { data } = await client.query({
    query: gql`
      query {
        episodes {
          info {
            count
          }
          results {
            id
            name
            air_date
            episode
            characters {
              id
              name
            }
          }
        }
      }
    `,
  });
  return {
    props: {
      episodes: data.episodes.results,
    },
  };
}
  export default function EpisodeOverview({episodes}) {
    const classes = useStyles();
    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <Head></Head>
          <div>
            <Typography variant="h3" component="h3" align="center">
              Rick and Morty Episodes
            </Typography>
            <ul style={{ listStyle: "none" }}>
              {episodes.map((episode) => {
                return (
                  <Card className={classes.root}>
                    <li>
                      <Typography gutterBottom variant="h5" component="h2">
                        <Link href={"/episodes/" + episode.id} key={episode.id}>
                          <a>{episode.name}</a>
                        </Link>
                      </Typography>
                      <Typography variant="body" component="p">
                        {episode.episode}
                      </Typography>
                    </li>
                  </Card>
                );
              })}
            </ul>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }

  
