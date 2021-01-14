// installed axios - npm i axios. axios makes HTTP requests (calls)
  // import axios
// installed react router - npm install react-router-dom. router generates urls
  // import react-router-dom
  import React from 'react';
  import axios from 'axios';
  import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  import './App.css'
  import PokeCard from './PokeCard'
  
  //const WINES_URL = 'http://myapi-profstream.herokuapp.com/api/779738/wines/'
  //const POKEMON_URL = 'https://pokeapi.co/api/v2/pokemon/'
  const PEOPLE_URL = 'http://myapi-profstream.herokuapp.com/api/fdf5d8/persons/'
  
  const sprite = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"
  const img = "https://pokeres.bastionbot.org/images/pokemon/"

  class App extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {};
    }
  
  
    render() {
      return (
      <Router>
        <div className="header">
          <div className="nav">
            <Link to="/home">Home</Link> || <Link to="/Pokedex">Pokedex</Link> || <Link to="/pokemon">Pokemon</Link>
          </div>
  
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/pokedex">
              <Pokedex />
            </Route>
            <Route path="/pokemon">
              <Pokemon />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
  }
  

      class Pokemon extends React.Component {
        constructor(props) {
          super(props);
      
          this.state = { data: [] }
        }
      
        async componentDidMount() {
          try{
            //const res = await axios.get(POKEMON_URL);
            //const response = await axios.get('http://hp-api.herokuapp.com/api/characters')
            //const response = await axios.get('https://pokeapi.co/api/v2/pokemon/')
            const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=3')
            //console.log(res)
            this.setState( { data: res.data.results } )
            //console.log(res.data)
            //const id=(res.data.results[0])
            //console.log(id)
            //console.log(response.data)
            
          } catch(error) {
            console.error(error.message);
          }
        }

        render() { 
          return ( 
            <div>
               {this.state.data.map(pokemon => 
             <GetAllPokemon
                name={pokemon.name} 
                url={pokemon.url}/>
              )}
            </div>
           );
        }
      }

      class GetAllPokemon extends React.Component {
        constructor(props) {
          super(props);
          
          this.state = {data:[]}
        }

        async componentDidMount() {
          try{
          const {data} = await axios.get(this.props.url)
          this.setState ( { data: data } )
          data.types.forEach( (type) => {
            pokemon['type'] = pokemon['type'] + ', ' + type.type.name;
          })
        } catch(error) {
          console.error(error.message);
        }
        }

        render() {
          
          return(
            <div className="pokemonCardContainer">
              
              <div className="pokemonCard">           

                  <div className="pokemonBackground"  key={this.state.data.id}>
                    <img src= {img + this.state.data.id + ".png"} alt="image" width="180px" />
                  </div> 

                  <div className="pokemonContent">
                  <h2 id="pokemonName">#{this.state.data.id} {this.state.data.name}</h2>

                  <h5>Ability: {this.state.data.abilities && this.state.data.abilities[0].ability.name}</h5>
                  <h6>Move: {this.state.data.moves && this.state.data.moves[0].move.name}</h6>

                      
                  </div>

              </div>

            </div>
          )
        }
      }

  
  class Pokedex extends App {
    constructor(props) {
      super(props);
  
      this.state = { data: [] }
    }
  
    async componentDidMount() {
      try{
        //const res = await axios.get(POKEMON_URL);
        //const response = await axios.get('http://hp-api.herokuapp.com/api/characters')
        const res = await axios.get('https://pokeapi.co/api/v2/pokemon/133')
        //const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151')
        console.log(res)
        this.setState( { data: res.data } )
        //console.log(res.data.sprites.front_default)
        //const pokeID = res.data.results.url;
        //console.log(pokeID)
      } catch(error) {
        console.error(error.message);
      }
    }
  
    render() { 
      return ( 
         <div className = "pokemonHeader">
          <input type="text" name="pokemonSearch" placeholder="enter # or name"/>

           <div className = "pokemonCards">
              <div className = "cardContent">
                <h1>{this.state.data.id}. {this.state.data.name}</h1>
                <img src= {sprite + this.state.data.id + ".png"} alt="images" />
                <h3>Height: {this.state.data.height}</h3>
                <h3>Weight: {this.state.data.weight}</h3>
              </div>
           </div>

         </div>
       );
    }
  }






  
  class Home extends App {
    constructor() {
      super();
      this.state = {
        pokemons : [],
        pokemonDetails : [],
      }    
    }
  
    componentDidMount() {
      this.getMorePokemon();
    }
  
    getMorePokemon() {
      //let url = "https://pokeapi.co/api/v2/pokemon?offset=" + this.state.offset + "&limit=" + this.state.loadNumber;
      let url = "https://pokeapi.co/api/v2/pokemon?limit=151"
      fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data) {
          this.setState({pokemons : data.results}, () => {
            this.state.pokemons.map(pokemon => {
              fetch(pokemon.url)
              .then(response => response.json())
              .then(data => {
                if (data) {
                  var temp = this.state.pokemonDetails
                  temp.push(data)
                  this.setState({pokemonDetails: temp})
                }            
              })
              .catch(console.log)
            })
          })        
        }
      })
      .catch(console.log)
    }
  
    render() {
      const {pokemonDetails} = this.state;
  
      const renderedPokemonList = pokemonDetails.map((pokemon, index) => {
        return (<PokeCard pokemon={pokemon} />);
      });
  
      return (
        <div className="container2">
          <div className="card-columns">
            {renderedPokemonList}
          </div>
        </div>
      );
    }
  }
    
  
  export default App;