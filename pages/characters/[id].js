 import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
 import Image from "next/image";

 
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
  const paths = data.characters.results.map(character => {
      return {
          params: {id: character.id.toString() }
      }
  })
  return {
      paths: paths,
      fallback: false
    }
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
          }
        }
      `,
    });

    return {
        props: {
          character: data.character,
        },
      };
}
export default function Details({character}) {
    return (
      <div>
        <h2>{character.name}</h2>
        <p>{character.location.name}</p>
        <p>{character.species}</p>
        <Image src={character.image} width={300} height={300} padding={30} />
      </div>
    );
}