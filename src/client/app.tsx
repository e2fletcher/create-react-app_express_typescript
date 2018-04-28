import * as React from 'react'
import HeroesList from './components/heroes-list.component'
import HeroesForm from './components/heroes-form.component'
import './app.css'

class App extends React.Component {

  render() {
    return (
      <div className="container">
        <div className="item bg-red">
          <HeroesForm />
        </div>
        <div className="item item-2 bg-blue">
          <HeroesList />
        </div>
      </div>
    );
  }
}

export default App;
