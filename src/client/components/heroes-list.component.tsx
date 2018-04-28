import * as React from 'react'
import './heroes-list.css'

export namespace HeroesList {
  export interface Props {}
  export interface State {
    heroes: Hero[]
  }
}

class HeroesList extends React.Component<HeroesList.Props, HeroesList.State> {

  state = {
    heroes: [] as Hero[]
  }

  handleLoadHeroes = async () => {
    const res = await fetch('/heroes')
    if (res.ok) {
      const heroes = await res.json() as Hero[]
      this.setState({heroes})
    }
  }

  handleDelete = (id: any) => {
    fetch(`/heroes/${id}`, {
      method: 'delete',
    }).then(res => {
      if (res.ok) {
        const heroes = this.state.heroes.filter(h => h.id !== id)
        this.setState({heroes})
      }
    })
  }

  render() {
    const { heroes } = this.state
    return (
      <div className="HeroList-main">
        <button onClick={this.handleLoadHeroes}>Load Heroes</button>
        <ul>
          {heroes.map(hero => (
          <li key={hero.id}>
            {hero.name}
            <button
              className="Button-delete"
              onClick={() => this.handleDelete(hero.id)}
            >x
            </button>
          </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default HeroesList
