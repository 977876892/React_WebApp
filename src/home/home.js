import React, { Component } from 'react';
import './home.css';
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemsArr: []
        }
    }
    componentDidMount() {
        const apiUrl = 'http://localhost:1234/items/get';
        fetch(apiUrl, {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        })
            .then((response) => response.json())
            .then((data) => {
                this.setState({itemsArr:data['data']})
            }
            );
    }

    render() {
        return (
            <div className="home">
                <div>
                    {this.state.itemsArr.map(name => (
                        <div className="images" >
                            <img src={require(`../itemImages/${name.type}.png`)} />
                            <h5><b>{name.title}</b></h5>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Home;