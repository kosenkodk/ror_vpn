import React from 'react';
import icPdf from 'images/icons/ic_pdf3';
import { ModalPopup } from '../../_components';
// import { Document, Page } from 'react-pdf';
// import { Document } from 'react-pdf/dist/entry.webpack';
// import { Document } from 'react-pdf/dist/entry.parcel';
// import ReactPDF from '@react-pdf/renderer';

class AttachmentPdf extends React.Component {
  render() {
    const { name, url, index } = this.props;
    const item = { 'name': name, 'url': url };
    return (
      <div className="card">
        <div className="embed-responsive embed-responsive-16by9">
          {/* <iframe scrolling="auto" width="200" height="150" src={item.url} title={item.name} frameborder="1" ></iframe> */}
          {/* <object width="400" height="500" type="application/pdf" data={`${item.url}?#zoom=85&scrollbar=0&toolbar=0&navpanes=0`}>
            <embed src={item.url} type="application/pdf">
              <p>{item.name}PDF cannot be displayed.</p>
              <p>This browser does not support PDFs. Please download the {item.name} to view it: <a href={item.url}>Download {item.name}</a>.</p>
            </embed>
          </object> */}



          {/* <Document
            file={item.url}
          // url={item.url} // no pdf file specified
          // data={item.url} // no pdf file specified
          /> */}

          {/* ReactPDF.render(<MyDocument />, `${__dirname}/example.pdf`); */}

          {/* object with embed support on old browsers even on mobiles */}
          {/* <object width="75" height="40" type="application/pdf" data={`${item.url}?#zoom=0&scrollbar=0&toolbar=0&navpanes=0`}> */}
          {/* <embed src={item.url} type="application/pdf" /> */}
          {/* <embed src={item.url} type="application/pdf"> */}
          {/* <p>{item.name}PDF cannot be displayed.</p> */}
          {/* <p>This browser does not support PDFs. Please download the {item.name} to view it: <a href={item.url}>Download {item.name}</a>.</p> */}
          {/* </embed> */}
          {/* </object> */}

          {/* <object className="attachment-pdf" id={index} data={item.url} type="application/pdf">
            <embed src={item.url} type="application/pdf" />
          </object> */}

          {/* pdf viewing in new tab */}
          {/* <a className="" href={item.url}>
            <img src={icPdf} className="card-img-top embed-responsive-item cover" alt={item.name} />
          </a> */}

          {/* pdf viewing in modal popup */}
          {/* <ModalPopup id={`modalForAttachmentPdf${index}`} aImgClasses='card-img-top embed-responsive-item cover' aUrl={item.url} aImgSrc={icPdf} aTitle={item.name} title={item.name} isShowFooter={false} >
            <div className="vh-75">
              <iframe scrolling="yes" className="w-100 h-100" src={item.url} ></iframe>
            </div>
          </ModalPopup> */}
        </div>
        {/* <div className="card-body">
          <h5 className="card-title">{item.name}</h5>
          <p className="card-text">
            <a className="" href={item.url}>{item.name}</a>
          </p>
        </div> */}
        {/* <div className="card-footer">
          <small className="text-muted">
            {item.name}
          </small>
        </div> */}
      </div>
    );
  }
}

export { AttachmentPdf };