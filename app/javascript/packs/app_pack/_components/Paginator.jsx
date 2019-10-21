import React from 'react';
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
    const { pageCurrent = 1, pageTotal = 1 } = this.props
    console.log('paginator pageCurrent:', pageCurrent, 'pageTotal', pageTotal)
    return (
      <nav aria-label="Paginator">
        <ul className="pagination justify-content-end">
          <li className={`page-item ${pageCurrent > 1 ? '' : 'disabled'}`}>
            <a className="page-link" tabIndex="-1"
              onClick={(e) => this.onPageChange(e, this.pagePrev(pageCurrent))}>Previous</a>
          </li>
          {Array(pageTotal).fill().map((v, i) => i + 1).map((item, index) =>
            <li key={`page${item}`} className={`page-item ${pageCurrent === item ? 'active' : ''}`}>
              {pageCurrent === item ?
                <span className="page-link">{item}
                  <span className="sr-only">(current)</span>
                </span>
                :
                <a className="page-link"
                  onClick={(e) => this.onPageChange(e, item)}>{item}</a>
              }
            </li>
          )}
          <li className={`page-item ${pageCurrent >= pageTotal ? 'disabled' : ''}`}>
            <a className="page-link"
              onClick={(e) => this.onPageChange(e, this.pageNext(pageCurrent))}>Next</a>
          </li>
        </ul>
      </nav>
    )
  }
}

export { Paginator }

// function mapStateToProps(state) {
//   const { page: pageCurrent, pages: pageTotal } = state.tickets;
//   return {
//     pageCurrent,
//     pageTotal,
//   };
// }

// const connectedTicketsPage = connect(mapStateToProps)(Paginator);
// export { connectedTicketsPage as Paginator };
