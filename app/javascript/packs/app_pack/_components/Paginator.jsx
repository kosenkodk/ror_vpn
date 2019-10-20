import React from 'react';
import { Link } from 'react-router-dom';
import { urls } from 'config';
import { connect } from 'react-redux';

class Paginator extends React.Component {
  constructor(props) {
    super(props);
    this.onPageChange = this.onPageChange.bind(this);
  }

  onPageChange(e, pageNumber) {
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
    const { pageCurrent, pageTotal } = this.props
    return (
      <nav aria-label="Paginator">
        <ul className="pagination justify-content-end">
          <li className={`page-item ${pageCurrent > 1 ? '' : 'disabled'}`}>
            <Link className="page-link" tabIndex="-1"
              onClick={(e) => this.onPageChange(e, this.pagePrev(pageCurrent))}>Previous</Link>
          </li>
          {Array(pageTotal).fill().map((v, i) => i + 1).map((item, index) =>
            <li key={`page${item}`} className={`page-item ${pageCurrent === item ? 'active' : ''}`}>
              {pageCurrent === item ?
                <span className="page-link">{item}
                  <span className="sr-only">(current)</span>
                </span>
                :
                <Link className="page-link"
                  onClick={(e) => this.onPageChange(e, item)}>{item}</Link>
              }
            </li>
          )}
          <li className={`page-item ${pageCurrent >= pageTotal ? 'disabled' : ''}`}>
            <Link className="page-link"
              onClick={(e) => this.onPageChange(e, this.pageNext(pageCurrent))}>Next</Link>
          </li>
        </ul>
      </nav>
    )
  }
}

function mapStateToProps(state) {
  const { page: pageCurrent, pages: pageTotal } = state.tickets;
  return {
    pageCurrent,
    pageTotal,
  };
}

const connectedTicketsPage = connect(mapStateToProps)(Paginator);
export { connectedTicketsPage as Paginator };
