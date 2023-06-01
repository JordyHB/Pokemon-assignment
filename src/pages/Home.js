import React, { useState, useEffect, useRef} from 'react';
import axios from "axios";


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

    function constructPokemonTiles() {
       allPokemon.results.forEach((pokemon) => {
           console.log(pokemon.name)
           })
    }


    // on page mount fills the state with the info from the first request
    useEffect(() => {
        void fetchAllPokemon()
    }, [])


    useEffect(() => {
        if(isMounted.current) {
            constructPokemonTiles()
        }

        isMounted.current = true

    }, [allPokemon])

    return (
        <div>
            <button onClick={fetchAllPokemon}>Reee</button>
            <h1>Welcome on the Home page</h1>
        </div>
    );
}

export default Home;