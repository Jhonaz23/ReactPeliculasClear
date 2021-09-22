import React,{Fragment}from 'react'

import Card from  '../components/Card/Card'
const resJSON = require('../assets/data.json')

const API = 'http://www.omdbapi.com/?i=tt3896198&apikey=1b20b640'

class List extends React.Component{
    
constructor(){
    super();
    this.state = {
         data:[],
         searchTerm: '',
         error: ''
  }
}

   async componentDidMount(){
    
    const resJson =  await (await fetch(API + '&s=batman')).json()
    console.log( resJson)
    console.log( resJson.Search)

    this.setState({data: resJson.Search})
    }
    
    async handleSubmit(e) {
      e.preventDefault();
      if (!this.state.searchTerm) {
       return this.setState({error: 'Please write a valid text'})
      }
           const data = await (await fetch(API + '&s=' + this.state.searchTerm)).json()
           console.log(data)
    if (!data.Search){
  return this.setState({error: 'There are no results'})
}

           this.setState({data: data.Search, error: '',searchTerm: ''})
    }

    render() {
      return(

        <Fragment>
          <div className="row">
            <div className="col-md-4 offset-md-4 p-4">
              <form onSubmit={(e)=>this.handleSubmit(e)}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                  onChange={e => this.setState({searchTerm: e.target.value})}
                  value={this.state.searchTerm}
                  autoFocus
                  />
              </form>
              <p className = "text-white">{this.state.error ? this.state.error :''}</p>
            </div>
          </div>
          <div className="row">
            {
              this.state.data.map(movie =>{
                return <Card movie={movie}/>;
              })
            }
            
          </div>
        </Fragment>
      )
    }


    
}


export default List
