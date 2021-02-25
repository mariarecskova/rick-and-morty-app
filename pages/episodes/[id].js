import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 800,
    justifyContent: "center",
    alignItems: "center",
    padding: "30px",
    margin: "auto",
  },
  title: {
    fontSize: 14,
  }
}));
export async function getStaticPaths() {
  const client = new ApolloClient({
    uri: "https://rickandmortyapi.com/graphql/",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query {
        episodes {
          results {
            name
            id
          }
        }
      }
    `,
  });
  const paths = data.episodes.results.map((episode) => {
    return {
      params: { id: episode.id.toString() },
    };
  });
  return {
    paths: paths,
    fallback: false,
  };
}

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const client = new ApolloClient({
    uri: "https://rickandmortyapi.com/graphql/",
    cache: new InMemoryCache(),
  });
  const { data } = await client.query({
    query: gql`
      query {
        episode(id: ${id}) {
          name
          episode
          air_date
          characters {
            id
            name
          }
        }
      }
    `,
  });

  return {
    props: {
      episode: data.episode,
    },
  };
};
export default function Details({ episode }) {
  const classes = useStyles();
  return (
    <div>
      <Container className={classes.root}>
        <Typography variant="h4" component="h4" align="center">
          {episode.name}
        </Typography>
        <Typography variant="h5" component="h5" align="center">
          {episode.episode}
        </Typography>
        <Typography variant="h5" component="h5" align="center">
          {episode.air_date}
        </Typography>
        <Typography variant="h5" component="h5" align="center">
          Characters
        </Typography>
        <ul style={{ listStyle: "none", textAlign: "center", padding: "10px"}}>
          {episode.characters.map((character) => {
            return (
              <li>
                <Link href={"/characters/" + character.id} key={character.id}>
                  <a
                    style={{
                      textDecoration: "none",
                      color: "black",
                      fontSize: "16px",
                      padding: "10px"
                    }}
                  >
                    {character.name}
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </div>
  );
}
