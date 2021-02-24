 import Image from "next/image";

 export const getStaticPaths = async () => {
   const res = await fetch("https://rickandmortyapi.com/api/character");
   const data = await res.json();

   const paths = data.results.map((character) => {
     return {
       params: { id: character.id.toString() },
     };
   });

   return {
     paths,
     fallback: false,
   };
 };

 export const getStaticProps = async (context) => {
   const id = context.params.id;
   const res = await fetch("https://rickandmortyapi.com/api/character/" + id);
   const data = await res.json();

   return {
     props: { character: data },
   };
 };

 const Details = ({ character }) => {
   return (
     <div>
       <h1>{character.name}</h1>
       <p>{character.species}</p>
       <p>{character.location.name}</p>
       <Image src={character.image} width={300} height={300} padding={30} />
     </div>
   );
 };

 export default Details;