import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image"
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

// import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  
  root: {
    maxWidth: 300,
    justifyContent: "center",
    alignItems: "center",
    padding: "30px",
    margin: "auto"
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
}));

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: "https://rickandmortyapi.com/graphql/",
    cache: new InMemoryCache(), //if there is a request, it will check when it was updated for the last time
  });
  const { data } = await client.query({
    query: gql`
      query {
        characters {
          results {
            name
            id
            location {
              name
            }
            species
            episode {
              id
              episode
              air_date
            }
            image
          }
        }
      }
    `,
  });

  return {
    props: {
      characters: data.characters.results,
    },
  };
}


export default function CharacterOverview({ characters }) {
   const classes = useStyles();
  return (
    <div>
      <Head></Head>
      <div>
        <h1 style={{margin: "auto", textAlign: "center", padding: "20px"}} >
         Rick and Morty Characters
        </h1>
        <ul style={{ listStyle: "none" }}>
          {characters.map((character) => {
            return (
              <Card className={classes.root}>
                <li>
                  <CardMedia>
                    <Image
                      src={character.image}
                      width={300}
                      height={300}
                      padding={20}
                    />
                  </CardMedia>
                  <Typography gutterBottom variant="h5" component="h2">
                    <Link
                      href={"/characters/" + character.id}
                      key={character.id}
                    >
                      <a style={{ textDecoration: "none", color: "black" }}>
                        {character.name}
                      </a>
                    </Link>
                  </Typography>
                </li>
              </Card>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

