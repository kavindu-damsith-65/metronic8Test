import TopBar from "../components/TopBar"
import NavBar from "../components/NavBar"
import HeroSection from "../components/HeroSection"
import LatestMovies from "../components/LatestMovies"
import PopularMovies from "../components/PopularMovies"
import Footer from "../components/Footer"

export default function Home() {
    return (
        <>
            <TopBar />
            <NavBar />
            <HeroSection />
            <LatestMovies />
            <PopularMovies/>
            <Footer />
        </>
    )
}