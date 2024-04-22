import React, { Fragment, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import { Breadcrumbs } from '../../../AbstractElements';
import HeaderCard from '../../../Components/Common/Component/HeaderCard';
import DataTableUsers from './DataTablePeminjaman';

const DataPeminjaman = () => {

  useEffect(() => {
    console.log(localStorage.getItem("login"));
    console.log(window.location.href);
  })
  return (
    <Fragment>
      <Breadcrumbs parent="Table" title="Data Peminjaman Done" mainTitle="Data Peminjaman Done" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Data Peminjaman" />
              <CardBody>
                <DataTableUsers />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );

};

export default DataPeminjaman;