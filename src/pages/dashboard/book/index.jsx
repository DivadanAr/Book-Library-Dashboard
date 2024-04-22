import React, { Fragment } from 'react';
import { Breadcrumbs } from '../../../AbstractElements';
import BookContent from './BookContent';
import { Card, Col, Container, Row } from 'reactstrap';

const Book = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Apps' title='Book' mainTitle='Book' />
      <Container fluid={true}>
        <Row>
          {/* <FileSideBar /> */}
          <Col xl='12' md='12' className='box-col-12'>
            <div className='file-content'>
              <Card>
                <BookContent />
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
export default Book;
