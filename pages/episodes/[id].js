import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";

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
  return (
    <div>
      <h2>{episode.name}</h2>
      <p>{episode.episode}</p>
      <p>{episode.air_date}</p>
      <ul style={{ listStyle: "none" }}>
        {episode.characters.map((character) => {
          return (
            <li>
              <Link href={"/characters/" + character.id} key={character.id}>
                <a>{character.name}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
