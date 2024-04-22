import React, { Fragment } from 'react';
import { Breadcrumbs } from '../../../../AbstractElements';
import FormBookDetail from './FormBookDetail';
import { Card, Col, Container, Row } from 'reactstrap';

const DetailBook = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Master Data' title='Add Book' mainTitle='Add Book' />
      <Container fluid={true}>
        <Row>
          {/* <FileSideBar /> */}
          <Col xl='12' md='12' className='box-col-12'>
            <div className='file-content'>
              <Card>
                <FormBookDetail />
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
export default DetailBook;
