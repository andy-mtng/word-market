import Navbar from "../components/Navbar";

function Home(): JSX.Element {
    return (
        <div>
            <Navbar />
            <h1>Home</h1>
            <h1 className="text-3xl">Roboto</h1>
        </div>
    );
}

export default Home;
