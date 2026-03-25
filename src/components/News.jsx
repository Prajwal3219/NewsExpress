import PropTypes from 'prop-types';
import { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import NewsItem from './NewsItem';
import Spinner from './Spinner';

export class News extends Component {
  static defaultProps = {
    country: 'us',
    pageSize: 8,
    category: 'science'
  }
  static PropTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string

  }

  constructor() {
    super();
    console.log("Hello I am constructor from news compoenent")
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults :0

    }


  }

  async updateNews() {
      
    this.props.setProgress(10)
    this.setState({ loading: true });
    const url = `/api/gnews?country=${this.props.country}&category=${this.props.category}&apikey=${import.meta.env.VITE_API_KEY}&page=${this.state.page}&max=${this.props.pageSize}`;
    let data = await fetch(url)
    this.props.setProgress(30)
    let parse = await (data.json())
    this.props.setProgress(60)
    console.log(parse)
    this.setState({
      articles: parse.articles || [],
      totalResults: parse.totalArticles || parse.totalResults || 0,
      loading: false
    })
    this.props.setProgress(100)
  }

  async componentDidMount() {
    this.updateNews();
  }




  handleNext = async () => {
    this.setState({ page: this.state.page + 1 });
    this.updateNews()

  }


  handlePrev = async () => {
    this.setState({ page: this.state.page - 1 })
    this.updateNews()
  }


  fetchMoreData = async() =>{
    this.setState({ loading: true, page: this.state.page + 1 });
    const url = `/api/gnews?country=${this.props.country}&category=${this.props.category}&apikey=${import.meta.env.VITE_API_KEY}&page=${this.state.page}&max=${this.props.pageSize}`;
    let data = await fetch(url)
    let parse = await (data.json())
    console.log(parse)
    this.setState({
      articles: this.state.articles.concat(parse.articles || []),
      totalResults: parse.totalArticles || parse.totalResults || 0,
      loading: false
    })
  }
  render() {
    return (
      <>
        <h1>NewsExpress {this.props.category == 'general' ? 'Headline' : this.props.category} News</h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={this.state.loading ? <Spinner /> : null}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((ele) => {
                return (
                  <div className="col-md-4" key={ele.url}>
                    <NewsItem
                      title={ele.title ? ele.title : ""}
                      description={ele.description ? ele.description : ""}
                      imageUrl={ele.image || ele.urlToImage}
                      newsUrl={ele.url}
                      author={ele.author}
                      date={ele.publishedAt}
                      source={ele.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    )
  }
}

export default News