import React, { Fragment, useState, useEffect } from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { Breadcrumbs, H4 } from "../../../AbstractElements";
import axios from 'axios';
import OverallBalance from "./OverallBalance";
import GreetingCard from "./GreetingCard";
import WidgetsWrapper from "./WidgetsWraper";
import RecentOrders from "./RecentOrders";
import ActivityCard from "./ActivityCard";
import RecentSales from "./RecentSales";
import TimelineCard from "./TimelineCard";
import PreAccountCard from "./PreAccountCard";
import TotalUserAndFollower from "./TotalUserAndFollower";
import PaperNote from "./PaperNote";
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [totalPeminjaman, setTotalPeminjaman] = useState([]);
  const [totalPeminjamanApprove, setTotalPeminjamanApprove] = useState(0);
  const [totalPeminjamanReject, setTotalPeminjamanReject] = useState(0);
  const [totalPeminjamanDone, setTotalPeminjamanDone] = useState(0);
  const [totalPeminjamanBorrowed, setTotalPeminjamanBorrowed] = useState(0);
  const [totalPeminjamanRequest, setTotalPeminjamanRequest] = useState(0);
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
  useEffect(() => {
    handleGetDataBuku();
    // const interval = setInterval(() => {
    //   handleGetDataBuku();
    // }, 3000);
  
    // return () => clearInterval(interval); 
  }, []);

  const handleGetDataBuku = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:9000/api/data/get");
  
      if (response.status >= 200 && response.status < 300) {
        console.log(response.data.Data["peminjaman"]["total_approve"]);
        setTotalPeminjaman(response.data.Data.peminjaman.total_approve + response.data.Data.peminjaman.total_reject + response.data.Data.peminjaman.total_done + response.data.Data.peminjaman.total_borrowed + response.data.Data.peminjaman.total_request)
        setTotalPeminjamanApprove(response.data.Data.peminjaman.total_approve);
        setTotalPeminjamanReject(response.data.Data.peminjaman.total_reject);
        setTotalPeminjamanDone(response.data.Data.peminjaman.total_done);
        setTotalPeminjamanBorrowed(response.data.Data.peminjaman.total_borrowed);
        setTotalPeminjamanRequest(response.data.Data.peminjaman.total_request);
      } else {
        toast.error("Terjadi Kesalahan!..");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("Terjadi Kesalahan!..");
    }

  };

  return (
      <Fragment>
        <Breadcrumbs mainTitle="Default" parent="Dashboard" title="Default" />
        <Container fluid={true}>
          <Row className="widget-grid">
            <GreetingCard />
            <Col xxl='auto' xl='3' sm='6' className='box-col-6'>
              <Row>
                <Col xl='12'>
                <Col xxl='auto' xl='3' sm='6' className='box-col-6'>
              <Row>
              <Col xl='12'>
                <Card className='widget-1'>
                  <CardBody>
                    <div className='widget-content'>
                    <div>
                        <H4>{totalPeminjaman}</H4>
                        <span className='f-light'>Total Peminjaman</span>
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
                <Card className='widget-1'>
                  <CardBody>
                    <div className='widget-content'>
                    <div>
                        <H4>{totalPeminjaman}</H4>
                        <span className='f-light'>Total Peminjaman</span>
                      </div>
                    </div>
                    <div className={`font-${WidgetsData.color} f-w-500`}>
                      <i className={`icon-arrow-${WidgetsData.gros < 50 ? 'down' : 'up'} icon-rotate me-1`} />
                      <span>{`${WidgetsData.gros < 50 ? '-' : '+'}${WidgetsData.gros}%`}</span>
                    </div>
                  </CardBody>
                </Card>
              {/* <Widgets1 WidgetsData={WidgetsData2} /> */}
            </Col>
          </Row>
        </Col>
        <Col xxl='auto' xl='3' sm='6' className='box-col-6'>
          <Row>
            <Col xl='12'>
              
              {/* <Widgets1 data={WidgetsData3} /> */}
            </Col>
            <Col xl='12'>
              {/* <Widgets1 data={WidgetsData4} /> */}
            </Col>
          </Row>
        </Col>
        <Col xxl='auto' xl='12' sm='6' className='box-col-6'>
          <Row>
            <Col xxl='12' xl='6' className='box-col-12'>
              
            </Col>
            
            {/* <Col xxl='12' xl='6' className='box-col-12'>
              <Widgets2 chartClass='profit-chart ' data={Widgets2Data2} />
            </Col> */}
          </Row>
        </Col>

              {/* <Widgets1 data={WidgetsData} /> */}
            </Col>
            <Col xl='12'>
              {/* <Widgets1 data={WidgetsData2} /> */}
              
            </Col>
          </Row>
        </Col>
        <Col xxl='auto' xl='3' sm='6' className='box-col-6'>
          <Row>
            <Col xl='12'>
              {/* <Widgets1 data={WidgetsData3} /> */}
              <Card className='widget-1'>
                  <CardBody>
                    <div className='widget-content'>
                    <div>
                        <H4>{totalPeminjaman}</H4>
                        <span className='f-light'>Total Peminjaman</span>
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
              {/* <Widgets1 data={WidgetsData4} /> */}
              <Card className='widget-1'>
                  <CardBody>
                    <div className='widget-content'>
                    <div>
                        <H4>{totalPeminjaman}</H4>
                        <span className='f-light'>Total Peminjaman</span>
                      </div>
                    </div>
                    <div className={`font-${WidgetsData.color} f-w-500`}>
                      <i className={`icon-arrow-${WidgetsData.gros < 50 ? 'down' : 'up'} icon-rotate me-1`} />
                      <span>{`${WidgetsData.gros < 50 ? '-' : '+'}${WidgetsData.gros}%`}</span>
                    </div>
                  </CardBody>
                </Card>

            </Col>
          </Row>
        </Col>
        <Col xxl='auto' xl='12' sm='6' className='box-col-6'>
          <Row>
            <Col xxl='12' xl='6' className='box-col-12'>
              <Card className='widget-1'>
                <CardBody>
                  <div className='widget-content'>
                  <div>
                      <H4>{totalPeminjaman}</H4>
                      <span className='f-light'>Total Peminjaman</span>
                    </div>
                  </div>
                  <div className={`font-${WidgetsData.color} f-w-500`}>
                    <i className={`icon-arrow-${WidgetsData.gros < 50 ? 'down' : 'up'} icon-rotate me-1`} />
                    <span>{`${WidgetsData.gros < 50 ? '-' : '+'}${WidgetsData.gros}%`}</span>
                  </div>
                </CardBody>
              </Card>
            </Col>
              <Card className='widget-1'>
                <CardBody>
                  <div className='widget-content'>
                  <div>
                      <H4>{totalPeminjaman}</H4>
                      <span className='f-light'>Total Peminjaman</span>
                    </div>
                  </div>
                  <div className={`font-${WidgetsData.color} f-w-500`}>
                    <i className={`icon-arrow-${WidgetsData.gros < 50 ? 'down' : 'up'} icon-rotate me-1`} />
                    <span>{`${WidgetsData.gros < 50 ? '-' : '+'}${WidgetsData.gros}%`}</span>
                  </div>
                </CardBody>
              </Card>
          </Row>
        </Col>

            {/* <WidgetsWrapper /> */}
            <OverallBalance />
            <RecentOrders />
            <ActivityCard />
            <RecentSales />
            <TimelineCard />
            <PreAccountCard />
            <TotalUserAndFollower />
            <PaperNote />
          </Row>
        </Container>
      </Fragment>
  );
};

export default Dashboard;
