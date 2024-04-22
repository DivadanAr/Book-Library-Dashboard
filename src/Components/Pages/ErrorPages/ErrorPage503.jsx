import React, { Fragment, useContext } from 'react';
import sad from '../../../assets/images/other-images/sad.png';
import { Link } from 'react-router-dom';
import { Container, Button, Media, Col } from "reactstrap"
import { BACK_TO_HOME_PAGE } from "../../../Constant";
import CustomizerContext from '../../../_helper/Customizer';
import { H2, P } from '../../../AbstractElements';

const Error503 = () => {
    return (
        <Fragment>
            <div className="page-wrapper">
                <div className="error-wrapper">
                    <Container>
                        <Media body className="img-100" src={sad} alt="" />
                        <div className="error-heading">
                            <H2 attrH2={{ className: "headline font-secondary" }} >{"503"}</H2>
                        </div>
                        <Col md="8 offset-md-2">
                            <P attrPara={{ className: "sub-content" }} >{"The page you are attempting to reach is currently not available. This may be because the page does not exist or has been moved."}</P>
                        </Col>
                        <Link to={`${process.env.PUBLIC_URL}/dashboard`}><Button color="secondary-gradien" size='lg'>{BACK_TO_HOME_PAGE}</Button></Link>
                    </Container>
                </div>
            </div>
        </Fragment>
    );
};

export default Error503;