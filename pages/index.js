import Link from "next/link";

function Home() {
  return (
    <ul>
      <li>
        <Link href="/">
          <a>Rick and Morty Application</a>
        </Link>
      </li>
      <li>
        <Link href="/characters">
          <a>Characters</a>
        </Link>
      </li>
      <li>
        <Link href="/episodes">
          <a>Episodes</a>
        </Link>
      </li>
    </ul>
  );
}

export default Home;
