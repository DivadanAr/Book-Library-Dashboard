import React from 'react';
import { Col, Row, Card, CardBody } from 'reactstrap';
import { Widgets2Data, Widgets2Data2, WidgetsData, WidgetsData2, WidgetsData3, WidgetsData4 } from '../../../Data/DefaultDashboard';
import { H4 } from '../../../AbstractElements';
import Widgets1 from '../../../Components/Common/CommonWidgets/Widgets1';
import Widgets2 from '../../../Components/Common/CommonWidgets/Widgets2';

const WidgetsWrapper = () => {
  const WidgetsData = {
    title: 'Peminjaman',
    gros: 50,
    total: 10_000,
    color: 'secondary',
    icon: 'cart',
  };
  const WidgetsData2 = {
    title: 'Sales return',
    gros: 20,
    total: 7000,
    color: 'warning',
    icon: 'return-box',
  };
  const WidgetsData3 = {
    title: 'Sales',
    gros: 70,
    total: 4_200,
    color: 'primary',
    icon: 'tag',
  };
  const WidgetsData4 = {
    title: 'Purchase rate',
    gros: 70,
    total: 5700,
    color: 'success',
    icon: 'rate',
  };
  
  return (
    <>
      <Col xxl='auto' xl='3' sm='6' className='box-col-6'>
        <Row>
          <Col xl='12'>
          <Card className='widget-1'>
      <CardBody>
        <div className='widget-content'>
=          <div>
            <H4>{WidgetsData.total}</H4>
            <span className='f-light'>{WidgetsData.title}</span>
          </div>
        </div>
        <div className={`font-${WidgetsData.color} f-w-500`}>
          <i className={`icon-arrow-${WidgetsData.gros < 50 ? 'down' : 'up'} icon-rotate me-1`} />
          <span>{`${WidgetsData.gros < 50 ? '-' : '+'}${WidgetsData.gros}%`}</span>
        </div>
      </CardBody>
    </Card>
          </Col>
          <Col xl='12'>
            <Widgets1 WidgetsData={WidgetsData2} />
          </Col>
        </Row>
      </Col>
      <Col xxl='auto' xl='3' sm='6' className='box-col-6'>
        <Row>
          <Col xl='12'>
            <Widgets1 data={WidgetsData3} />
          </Col>
          <Col xl='12'>
            <Widgets1 data={WidgetsData4} />
          </Col>
        </Row>
      </Col>
      <Col xxl='auto' xl='12' sm='6' className='box-col-6'>
        <Row>
          <Col xxl='12' xl='6' className='box-col-12'>
            <Widgets2 data={Widgets2Data} />
          </Col>
          {/* <Col xxl='12' xl='6' className='box-col-12'>
            <Widgets2 chartClass='profit-chart ' data={Widgets2Data2} />
          </Col> */}
        </Row>
      </Col>
    </>
  );
};

export default WidgetsWrapper;
