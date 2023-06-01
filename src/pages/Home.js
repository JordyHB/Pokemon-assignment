import React, { useState, useEffect, useRef} from 'react';
import axios from "axios";
import './Home.css'
import PokemonTile from "../components/PokemonTile";


function Home(props) {

    const ENDPOINT = 'https://pokeapi.co/api/v2/'
    const [error, toggleError] = useState(false)
    const [isLoading, toggleIsLoading] = useState(false)
    const [pokemonOffset, setPokemonOffset] = useState(0)
    const [allPokemon, setAllPokemon] = useState({})
    const isMounted = useRef(false)


    // requests a set of pokemon to be displayed on the page
    async function fetchAllPokemon() {
        toggleIsLoading(true)
        try {
            // resets error back to initial state
            toggleError(false)
            // gets the data from the request and stores it in the state
            setAllPokemon((await axios.get(`${ENDPOINT}pokemon?offset=${pokemonOffset}`)).data)

        } catch (e) {
            toggleError(true)
            console.error(e)
        }
        toggleIsLoading(false)
    }

    function handleNext() {
       setPokemonOffset(pokemonOffset + 20)
    }


    // on page mount fills the state with the info from the first request
    useEffect(() => {
        void fetchAllPokemon()
    }, [pokemonOffset])



    return (
        <>
            <button onClick={handleNext}>Next</button>
            <h1>Welcome on the Home page</h1>
            {/*maps over all pokemon feeding the endpoint for their details to the component*/}
            <section className="pokemon-tile-container">
                { allPokemon.results && allPokemon.results.map((pokemon) =>
                    <PokemonTile
                        key={pokemon.name}
                        REQUESTENDPOINT={pokemon.url}
                    />
                )
                }
            </section>
        </>
    );
}

export default Home;