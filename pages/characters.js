import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image"
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";


//styles
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 300,
    justifyContent: "center",
    alignItems: "center",
    padding: "30px",
    margin: "auto",
    marginTop: "40px",
    backgroundColor: "#f5f5f5",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
}));

//API
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

//JSX
export default function CharacterOverview({ characters }) {
  const classes = useStyles();
  const [favorite, setfavorite] = useState(false);

  //this needs to be finished..
  function handleClick() {
    localStorage.setItem( "myFavorite", favorite)
    setfavorite();
  }
 
  return (
    <div>
      <Head></Head>
      <div>
        <Typography variant="h3" component="h3" align="center" >
          Rick and Morty Characters
        </Typography>
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
                  <IconButton
                    aria-label="add to favorites"
                    onclick={handleClick}
                  >
                    <FavoriteIcon />
                  </IconButton>
                </li>
              </Card>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

