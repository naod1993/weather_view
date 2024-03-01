import SearchBox from "@/components/SearchBox";
import Head from "next/head";
export default function Search() {
  return (
    <>
      <Head>
        <title>Weather View</title>
      </Head>
      <main className="mt-5 mx-5">
        <h1 className="text-xl font-medium mb-4">Weather View</h1>
        <form>
          <h2 className="text-lg mb-4">Search for local weather</h2>
          <div className="mb-4">
            <SearchBox />
          </div>
        </form>
      </main>
    </>
  );
}
