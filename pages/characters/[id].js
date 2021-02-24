import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    justifyContent: "center",
    alignItems: "center",
    padding: "30px",
    margin: "auto",
    marginTop: "30px",
  },
  title: {
    fontSize: 14,
  },
}));

export async function getStaticPaths() {
  const client = new ApolloClient({
    uri: "https://rickandmortyapi.com/graphql/",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query {
        characters {
          results {
            name
            id
          }
        }
      }
    `,
  });
  const paths = data.characters.results.map((character) => {
    return {
      params: { id: character.id.toString() },
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
          character(id: ${id}) {
            name
            image
            location {
              name
            }
            species
            episode {
                id
                name
                episode
            }
          }
        }
      `,
  });

  return {
    props: {
      character: data.character,
    },
  };
};
export default function Details({ character }) {
  const classes = useStyles();
  return (
    <div>
      <Container className={classes.root}>
        <Typography variant="h4" component="h4">
          <h2>{character.name}</h2>
        </Typography>
        <Card className={classes.root}>
          <Typography variant="h5" component="h5">
            {character.location.name}
          </Typography>
          <Typography variant="h5" component="h5">
            {character.species}
          </Typography>
          <CardMedia>
          <Image src={character.image} width={300} height={300} padding={30} />
        </CardMedia>
        </Card>
        <ul style={{ listStyle: "none" }}>
          {character.episode.map((episode) => {
            return (
              <Card className={classes.root}>
                <li>
                  <Typography variant="body" component="p">
                    <Link href={"/episodes/" + episode.id} key={episode.id}>
                      <a
                        style={{ textDecoration: "none", paddinBottom: "30px" }}
                      >
                        {episode.name}
                      </a>
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
      </Container>
    </div>
  );
}
