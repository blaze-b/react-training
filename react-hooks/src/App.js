import { Component, useState, useEffect } from 'react';

// Using class for use state
// class App extends Component {

//   state = {
//     count: 0
//   };

//   increment = () => {
//     this.setState({ count: this.state.count + 1 });
//   }

//   render() {
//     return (
//       <div>
//         <h2>Counter App</h2>
//         <button onClick={this.increment}>
//           Clicked {this.state.count} times
//         </button>
//       </div>
//     );
//   }
// }

// Editing for use effect
// class App extends Component {

//   state = {
//     count: 0
//   };

//   increment = () => {
//     this.setState({ count: this.state.count + 1 });
//   }

//   // Life cycle method
//   componentDidMount(){
//     document.title = `Clicked ${this.state.count} times`;
//   }

//   componentDidUpdate(){
//     document.title = `Clicked ${this.state.count} times`;
//   }


//   render() {
//     return (
//       <div>
//         <h2>Counter App</h2>
//         <button onClick={this.increment}>
//           Clicked {this.state.count} times
//         </button>
//       </div>
//     );
//   }
// }

// User Effect code
// const App = () => {
//   // current state value and a function
//   const [count, setCount] = useState(0);

//   useEffect(()=>{
//     document.title = `Clicked ${count} times`;
//   })

//   const increment = () => {
//     setCount(count + 1);
//   };

//   return (
//     <div>
//       <h2>Counter App</h2>
//       <button onClick={increment}>
//         Clicked {count} times
//         </button>
//     </div>
//   );
// }

const App = () => {

  const [news, setNews] = useState([]);
  const [searchNews, setSearchNews] = useState('react');
  const [url, setUrl] = useState('https://hn.algolia.com/api/v1/search?query=react');
  const [loading, setLoading] = useState(false);

  const fetchNews = () => {
    // loading true
    setLoading(true);
    fetch(`https://hn.algolia.com/api/v1/search?query=${searchNews}`)
      .then(result => result.json())
      .then(data => (setNews(data.hits), setLoading(false)))
      .catch(error => console.log(error));
  };

  const handleChange = (e) => {
    setSearchNews(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUrl(`https://hn.algolia.com/api/v1/search?query=${searchNews}`);
  }


  const showLoading = () => {
    return loading ? <h2>Loading....</h2> : "";
  }

  const searchForm = () => {
    return (<form onSubmit={handleSubmit}>
      <input type="text" value={searchNews} onChange={handleChange} />
      <button>Search</button>
    </form>);
  }

  const showNews = () => (news.map((n, i) =>
    (<p key={i}>{n.title}</p>)
  ));


  useEffect(() => {
    document.title = `News App`;
    fetchNews();
  }, [url]);

  return (
    <div>
      <h2>News</h2>
      {showLoading()}
      <div>
        {searchForm()}
      </div>
      {showNews()}
    </div>);
};

export default App;
