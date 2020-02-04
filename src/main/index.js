import React, {Component} from 'react'
import './index.css'
import List from './../components/List/ListItems'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faTrash} from '@fortawesome/free-solid-svg-icons'


library.add(faTrash)

class Main extends Component {
  constructor(props){
    super(props)

    this.state = {
      items: [],
      currentItem: {
        text: '',
        key: ''
      }
    }
  }

  handleInput(e){
    this.setState({
      currentItem:{
        text: e.target.value,
        key: Date.now()
      }
    })
  }

  addItem(e) {
    e.preventDefault()
    const newItem = this.state.currentItem
    if (newItem.text !== '') {
      const newItems = [...this.state.items, newItem]
      this.setState({
        items:newItems,
        currentItem: {
          text: '',
          key: ''
        }
      })
    }
  }

  deleteItem(key) {
    const filteredItems = this.state.items.filter(item => item.key !== key)
    this.setState({
      items: filteredItems
    })

  }

  setUpdate(text, key) {
    const items = this.state.items
    items.map(item => {
      if (item.key === key) {
        item.text = text
      }
      return ''
    })
    this.setState({
      items: items
    })
  }

  render() {
    return (
      <div className="App">
        <header>
          <form onSubmit={(e) => this.addItem(e)}>
            <input type="text" placeholder="Digite" value={this.state.currentItem.text}
            onChange={(e) => this.handleInput(e)} />
            <button type="submit">Add</button>
          </form>
        </header>        
        <List items={this.state.items} 
        deleteItem={(e) => this.deleteItem(e)}
        setUpdate={(e, y) => this.setUpdate(e, y)}/>
      </div>
    )
  }
}

export default Main
