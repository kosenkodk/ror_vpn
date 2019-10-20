import React from 'react';
// import { HashLink as Link } from 'react-router-hash-link';
import { Link } from 'react-router-dom';
import { urls } from 'config';

class Paginator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageCurrent: this.props.pageCurrent || 1,
      pageTotal: this.props.pageTotal || 1,
    }
    this.onPageChange = this.onPageChange.bind(this);
  }

  onPageChange(e, pageNumber) {
    this.setState({ pageCurrent: pageNumber });
    // this.props.onPageChange(e, pageNumber);
    e.preventDefault();
  }

  pagePrev(pageCurrent) {
    pageCurrent -= 1
    if (pageCurrent < 1) pageCurrent = 1
    return pageCurrent
  }

  pageNext(pageCurrent) {
    pageCurrent += 1
    if (pageCurrent > this.state.pageTotal) pageCurrent = this.state.pageTotal
    return pageCurrent
  }

  render() {
    const { pageCurrent, pageTotal } = this.state
    return (
      <nav aria-label="Paginator">
        <ul className="pagination justify-content-end">
          <li className={`page-item ${pageCurrent > 1 ? '' : 'disabled'}`}>
            <Link to={`${urls.tickets.path}?page=${this.pagePrev(pageCurrent)}`} className="page-link" tabIndex="-1"
              onClick={(e) => this.onPageChange(e, item)}>Previous</Link>
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
              onClick={(e) => this.onPageChange(e, item)} className="page-link">Next</Link>
          </li>
        </ul>
      </nav>
    )
  }
}

export { Paginator }