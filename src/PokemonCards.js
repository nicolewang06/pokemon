import React from 'react';

export default function PokemonCards() {
    const img = "https://pokeres.bastionbot.org/images/pokemon/";
  return(
    <div className="pokemonCardContainer">
              
              <div className="pokemonCard">           

                  <div className="pokemonBackground"  key={this.state.data.id}>
                    <a href="pokedex"><img src= {img + this.state.data.id + ".png"} alt="" width="120px" /></a>
                  </div> 

                  <div className="pokemonContent">
                  <h3 id="pokemonName">#{this.state.data.id} {this.state.data.name}</h3>

                  </div>

              </div>
            </div>
  )
}




                  {/* <h6>Move: {this.state.data.moves && this.state.data.moves.map(move => {
                    console.log(move);
                    return(<span>{move.move.name},</span>);
                  })}</h6>  

                  <h6>Type: { this.state.data.types && this.state.data.types.map(type => {
                      console.log(type);
                      return (<span>{type.type.name}, </span>);
                    }) }
                  </h6>
                  <h6>{this.state.data.types && this.state.data.types[0].type.name}</h6>
      <Pagination
        gotoNextPage={nextPageUrl ? gotoNextPage : null}
        gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
                  /> */}