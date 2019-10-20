import React from 'react';
// import { HashLink as Link } from 'react-router-hash-link';
import { Link } from 'react-router-dom';
import { urls } from 'config';
import { connect } from 'react-redux';

class Paginator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageCurrent: this.props.pageCurrent || 1,
      pageTotal: this.props.pageTotal || 2,
    }
    this.onPageChange = this.onPageChange.bind(this);
  }

  // componentWillUpdate() {
  //   this.setState({
  //     pageCurrent: this.props.pageCurrent,
  //     pageTotal: this.props.pageTotal,
  //   })
  // }

  onPageChange(e, pageNumber) {
    this.setState({ pageCurrent: pageNumber });
    this.props.onPageChange(e, pageNumber);
    e.preventDefault();
  }

  pagePrev(pageCurrent) {
    pageCurrent -= 1
    if (pageCurrent < 1) pageCurrent = 1
    return pageCurrent
  }

  pageNext(pageCurrent) {
    pageCurrent += 1
    if (pageCurrent > this.props.pageTotal) pageCurrent = this.props.pageTotal
    return pageCurrent
  }

  render() {
    // const { pageCurrent, pageTotal } = this.state
    const { pageCurrent, pageTotal } = this.props
    // const { pages, page } = this.props

    return (
      <nav aria-label="Paginator">
        <ul className="pagination justify-content-end">
          <li className={`page-item ${pageCurrent > 1 ? '' : 'disabled'}`}>
            <Link to={`${urls.tickets.path}?page=${this.pagePrev(pageCurrent)}`} className="page-link" tabIndex="-1"
              onClick={(e) => this.onPageChange(e, this.pagePrev(pageCurrent))}>Previous</Link>
          </li>
          {Array(pageTotal).fill().map((v, i) => i + 1).map((item, index) =>
            <li key={`page${item}`} className={`page-item ${pageCurrent === item ? 'active' : ''}`}>
              {pageCurrent === item ?
                <span className="page-link">{item}
                  <span className="sr-only">(current)</span>
                </span>
                :
                <Link to={`${urls.tickets.path}?page=${item}`} className="page-link"
                  onClick={(e) => this.onPageChange(e, item)}>{item}</Link>
              }
            </li>
          )}
          <li className={`page-item ${pageCurrent >= pageTotal ? 'disabled' : ''}`}>
            <Link to={`${urls.tickets.path}?page=${this.pageNext(pageCurrent)}`}
              onClick={(e) => this.onPageChange(e, this.pageNext(pageCurrent))} className="page-link">Next</Link>
          </li>
        </ul>
      </nav>
    )
  }
}

// export { Paginator }

function mapStateToProps(state) {
  const { loggedIn } = state.authentication
  const { items, page: pageCurrent, pages: pageTotal, loading, error } = state.tickets;
  return {
    loggedIn,
    items,
    pageCurrent,
    pageTotal,
    loading,
    error
  };
}

const connectedTicketsPage = connect(mapStateToProps)(Paginator);
export { connectedTicketsPage as Paginator };