import React from 'react';
import Item from './Item';
import Http from 'axios'
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            item: '',
            error: false,
            loading: true,
            items: []
        }
    }

    componentDidMount() {
        Http.get('https://todo-api.thetestpad.com/items')
            .then((result) => {
                this.setState({
                    loading: false,
                    items: result.data
                })
            })
            .catch(() => {
                this.setState({
                    loading: false,
                    error: true
                })
            })
    }

    addItem() {
        Http.post('https://todo-api.thetestpad.com/items', { description: this.state.item })
            .then((result) => {
                this.setState({
                    item: '',
                    items: [...this.state.items, result.data]
                })
            })
    }

    deleteItem(id) {
        Http.delete('https://todo-api.thetestpad.com/items/' + id)
            .then((result) => {
                this.setState({
                    items: this.state.items.filter(item => item.id !== id)
                })
            })
    }

    updateItem(id) {
        var item = this.state.items.filter(item => item.id === id)[0]
        Http.put('https://todo-api.thetestpad.com/items/' + id, { status: item.status === "0" ? true : false })
            .then((result) => {
                var items = this.state.items.map(item => {
                    if (item.id === id) {
                        item.status = item.status === "0" ? "1" : "0"
                    }
                    return item
                })

                this.setState({
                    items: [...items]
                })
            })
    }

    render() {
        return <div className="App">
            <nav className="navbar navbar-dark bg-dark">
                <div className='container'>
                    <a className="navbar-brand" href="#">Todo App</a>
                </div>
            </nav>

            <div className='jumbotron'>
                <div className='container'>
                    <div className="input-group mb-3">
                        <input onChange={(event) => { this.setState({ item: event.target.value }) }} value={this.state.item} type="text" className="form-control" placeholder="Example: Buy some milk" />
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" onClick={this.addItem.bind(this)}>Add</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='container'>
                <ul className='list-group'>
                    {this.state.error && <p>An error has occured :(</p>}
                    {this.state.loading && <p>Please wait :)</p>}
                    {!this.state.error && !this.state.loading && this.state.items.length === 0 && <p>You've no items yet :)</p>}
                    {!this.state.error && !this.state.loading && this.state.items.length > 0 && this.state.items.map(
                        item => <Item key={item.id} id={item.id} description={item.description} status={item.status === '1'} onUpdate={this.updateItem.bind(this)} onDelete={this.deleteItem.bind(this)} />
                    )}
                </ul>
            </div>
        </div >
    }
}

export default App;
