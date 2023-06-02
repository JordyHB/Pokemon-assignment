import React, { useState, useEffect } from 'react';
import axios from "axios";
import './PokemonTile.css'


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
                    <h2 className="pokemon-name">{pokemonInfo.species.name}</h2>
                    <img className="pokemon-sprite" src={pokemonInfo.sprites.front_default} alt="Pokemon Sprite"/>
                    <p className="pokemon-moves"><strong>Moves: </strong>{pokemonInfo.moves.length}</p>
                    <p className="pokemon-weight"><strong>Weight: </strong> {pokemonInfo.weight}</p>
                    <div className="ability-container">
                        <p><strong>Abilities: </strong></p>
                        {pokemonInfo.abilities.map(abilityInfo => <p className="pokemon-ability">{abilityInfo.ability.name}</p>)}
                    </div>

                </article> }
            </>
        );

}

export default PokemonTile;