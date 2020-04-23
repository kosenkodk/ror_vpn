import React from 'react';
import { Link } from 'react-router-dom';

class InfoBlock extends React.Component {
  render() {
    const { children, linkTitle, linkUrl, title, text, optionalCssClasses } = this.props;
    return (
      <div className={`border-left-pink mt-0 ${optionalCssClasses}`}>
        {children ? children :
          <React.Fragment>
            {title && <h6 id="caveat-with-anchors">{title}</h6>}
            {text && <p className="mt-0 mb-0">{text}
              {linkTitle && <Link to={`${linkUrl || '#'}`} className="mt-1 text-blue"> {linkTitle}</Link>}
            </p>}
          </React.Fragment>
        }
      </div>
    );
  }
}

export { InfoBlock };