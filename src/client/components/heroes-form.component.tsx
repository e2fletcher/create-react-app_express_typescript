import * as React from 'react'
import './heroes-form.css'

interface HeroForm extends Hero {}

export namespace HeroesForm {
  export interface Props {}
  export interface State {
    form: HeroForm
  }
}

export default class HeroesForm extends React.Component<HeroesForm.Props, HeroesForm.State> {

  state = {
    form: {
      name: '',
      description: '',
      strong: 0,
      speed: 0,
      flay: false
    }
  }

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    fetch('/heroes', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.form)
    }).then(res => {
      if (res.ok) {
        alert(`Hero: ${this.state.form.name} Append!`)
      }
    })
  }

  handleChangeFormInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const form = {...this.state.form}
    form[e.target.name] = e.target.value
    this.setState({form})
  }

  render() {
    const { form } = this.state
    return (
      <form className="Form" onSubmit={this.handleSubmit} >
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input name="name" type="text" onChange={this.handleChangeFormInput} value={form.name} required={true} />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            name="description"
            type="text"
            onChange={this.handleChangeFormInput}
            value={form.description}
            required={true}
          />
        </div>
        <div className="form-group">
          <label htmlFor="strong">Strong</label>
          <input
            name="strong"
            type="number"
            required={true}
            onChange={this.handleChangeFormInput}
            value={form.strong}
          />
        </div>
        <button type="submit">Guardar</button>
      </form>
    )
  }
}
