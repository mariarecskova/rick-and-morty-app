import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Head from "next/head";
import Link from "next/link";

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
    return (
      <div>
        <Head></Head>
        <div>
          <h1>Rick and Morty Episodes</h1>
          <ul style={{ listStyle: "none" }}>
            {episodes.map((episode) => {
              return (
                <li>
                  <Link href={"/episodes/" + episode.id} key={episode.id}>
                    <a>{episode.name}</a>
                  </Link>
                  <p>{episode.episode}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }

  
