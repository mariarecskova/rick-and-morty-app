import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image"

// import Link from "next/link";

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
  return (
    <div>
      <Head></Head>
      <div>
        <h1>Rick and Morty Characters</h1>
        <ul style={{ listStyle: "none" }}>
          {characters.map((character) => {
            return (
              <li>
                <Link href={"/characters/" + character.id} key={character.id}>
                  <a>{character.name}</a>
                </Link>
                <Image
                  src={character.image}
                  width={300}
                  height={300}
                  padding={20}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

