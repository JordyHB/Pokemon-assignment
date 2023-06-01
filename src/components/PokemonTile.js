import React, { useState, useEffect } from 'react';
import axios from "axios";


function PokemonTile({ REQUESTENDPOINT }) {



    const [ pokemonInfo, setPokemonInfo] = useState({})
    async function fetchPokeInfo() {
        try {
            setPokemonInfo((await axios.get(REQUESTENDPOINT)).data)
        } catch (e) {
            console.error(e)
        }

    }

        useEffect(() => {
            console.log('mounting')
            void fetchPokeInfo()
        }, [])

        useEffect(() => {
            console.log(pokemonInfo)
        }, [pokemonInfo] )

        return (
            <>
                { pokemonInfo.species &&
                <article className="pokemon-tile">
                    <h3>{pokemonInfo.species.name}</h3>
                    <img src={pokemonInfo.sprites.front_default} alt="Pokemon Sprite"/>
                    <p>{pokemonInfo.moves.length}</p>
                    <p>{pokemonInfo.weight}</p>
                    <div>
                        {pokemonInfo.abilities.map(abilityInfo => <p>{abilityInfo.ability.name}</p>)}
                    </div>

                </article> }
            </>
        );

}

export default PokemonTile;