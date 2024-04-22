import { Fragment, useState, useEffect } from "react";
import { Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { Btn, H4, P } from "../../../AbstractElements";
import { EmailAddress, ForgotPassword, Password, RememberPassword, SignIn } from "../../../Constant";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import man from "../../../assets/images/dashboard/profile.png";
import { ToastContainer, toast } from "react-toastify";

const Signin = ({ selected }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [togglePassword, setTogglePassword] = useState(false);
  const navigate = useNavigate();

  const [value] = useState(localStorage.getItem("profileURL" || man));
  const [name] = useState(localStorage.getItem("Name"));

  useEffect(() => {
    localStorage.setItem("profileURL", man);
  }, [value, name]);

  const loginAuth = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast.error("Pastikan Email dan Password Sudah Terisi");
      return;
    }
  
    const expiryDate = new Date();
    expiryDate.setTime(expiryDate.getTime() + 24 * 60 * 60 * 1000);
    const expiresHeaderValue = expiryDate.toUTCString();
  
    const user = {
      Email: email,
      Password: password,
    };
  
    try {
      const response = await axios.post("http://127.0.0.1:9000/api/auth/login", user, {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: expiresHeaderValue,
        },
      });
  
      if (response.status >= 200 && response.status < 300) {
        if (response.data.Data.Role === 'admin') {
          toast.success("Successfully logged in!..");
          localStorage.setItem("Name", response.data.Data.Username);
          localStorage.setItem("Role", response.data.Data.Role);
          localStorage.setItem("Profile", response.data.Data.ProfilePicture);
          localStorage.setItem("login", true);
          navigate(`${process.env.PUBLIC_URL}/dashboard`);
        } else {
          toast.error("Anda Tidak Memiliki akses!..");
        }
      } else {
        toast.error("You entered the wrong password or username!..");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("Pastikan Email dan Password Sudah Benar");
    }
  };
  
  return (
    <Fragment>
      <Container fluid={true} className="p-0 login-page">
        <Row>
          <Col xs="12">
            <div className="login-card">
              <div className="login-main login-tab">
                <Form className="theme-form">
                  <H4>{selected === "simpleLogin" ? "" : "Sign In With Simple Login"}</H4>
                  <P>{"Enter your email & password to login"}</P>
                  <FormGroup>
                    <Label className="col-form-label">{EmailAddress}</Label>
                    <Input className="form-control" placeholder="Enter Your Email" type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
                  </FormGroup>
                  <FormGroup className="position-relative">
                    <Label className="col-form-label">{Password}</Label>
                    <div className="position-relative">
                      <Input className="form-control" placeholder="Enter Your Password" type={togglePassword ? "text" : "password"} onChange={(e) => setPassword(e.target.value)} value={password} />
                      <div className="show-hide" onClick={() => setTogglePassword(!togglePassword)}>
                        <span className={togglePassword ? "" : "show"}></span>
                      </div>
                    </div>
                  </FormGroup>
                  <div className="position-relative form-group mb-0">
                    <div className="checkbox">
                      <Input id="checkbox1" type="checkbox" />
                      <Label className="text-muted" for="checkbox1">
                        {RememberPassword}
                      </Label>
                    </div>
                    <a className="link" href="#javascript">
                      {ForgotPassword}
                    </a>
                    <Btn attrBtn={{ color: "primary", className: "d-block w-100 mt-2", onClick: (e) => loginAuth(e) }}>{SignIn}</Btn>
                  </div>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </Fragment>
  );
};

export default Signin;
