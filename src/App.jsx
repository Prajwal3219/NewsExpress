import './App.css';

import { Component } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import Navbar from './components/Navbar';
import News from './components/News';

export default class App extends Component {
  pageSize =5;
  state ={
    progress :0
  }
  setProgress =(progress)=>{
    this.setState({progress: progress})
  }
  render() {
    return (
      <Router> {/* Wrap the application in BrowserRouter */}
        <div>
          <Navbar />
          <LoadingBar
          height={3}
          color='#f11946'
          progress={this.state.progress}
          
          />
          <Routes>
            <Route path="/" element={<News setProgress={this.setProgress} key="general" pageSize={5} category="general" />} />
            <Route path="/sport" element={<News setProgress={this.setProgress} key="sport" pageSize={5} category="sport" />} />
            <Route path="/tech" element={<News setProgress={this.setProgress} key="science" pageSize={5} category="science" />} />
            <Route path="/entertainment" element={<News setProgress={this.setProgress} key="entertainment" pageSize={5} category="entertainment" />} />
            <Route path="/business" element={<News setProgress={this.setProgress} key="business" pageSize={5} category="business" />} />
          </Routes>

        </div>
      </Router>
    );
  }
}