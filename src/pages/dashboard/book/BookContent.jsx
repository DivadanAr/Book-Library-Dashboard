import axios from 'axios';
import { Fragment, useState, useEffect } from 'react';
import { PlusSquare } from 'react-feather';
import errorImg from '../../../assets/images/search-not-found.png';
import { toast } from 'react-toastify';
import { H4, H5, LI, P, UL, Image } from '../../../AbstractElements';
import { CardBody, CardHeader, Form, Input, Media } from 'reactstrap';
import './book.css'
import { useNavigate } from "react-router-dom";

const BookData = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [myfile, setMyFile] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    handleGetDataBuku();
    // const interval = setInterval(() => {
    //   handleGetDataBuku();
    // }, 3000);
  
    // return () => clearInterval(interval); 
  }, []);

  const handleGetDataBuku = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:9000/api/buku/get");
  
      if (response.status >= 200 && response.status < 300) {
        setMyFile(response.data.Data.Buku);
      } else {
        toast.error("Terjadi Kesalahan!..");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("Terjadi Kesalahan!..");
    }

  };

  const handleSearchDataBuku = async (query) => {
    try {
      const response = await axios.get("http://127.0.0.1:9000/api/buku/get?Search="+query);
  
      if (response.status >= 200 && response.status < 300) {
        setMyFile(response.data.Data.Buku);
      } else {
        toast.error("Terjadi Kesalahan!..");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("Terjadi Kesalahan!..");
    }

  };

  const handleDeleteDataBuku = async (id) => {
    try {
      const response = await axios.delete("http://127.0.0.1:9000/api/buku/delete/"+id);
  
      if (response.status >= 200 && response.status < 300) {
        await handleGetDataBuku();
      } else {
        toast.error("Terjadi Kesalahan!..");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("Terjadi Kesalahan!..");
    }

  };

  const handleChange = (event) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
    console.log(event.target.value)
    handleSearchDataBuku(event.target.value)
  };

  const filelist = myfile.map((data, i) => {
    return (
      <LI attrLI={{ className: 'file-box' }} key={i}>
        <div className='container-book-top'>
          <div className="container-book">
            <div className="book">
              <div className="front">
                <div className="cover">
                  <Media style={{width: 120, height: 170, objectFit: 'cover'}} src={`http://127.0.0.1:9000/api/buku/get-cover/${data.cover}`} alt="" />
                </div>
              </div>
              <div className="left-side">
                <Media style={{width: 40, height: 170, objectFit: 'cover'}} src={`http://127.0.0.1:9000/api/buku/get-cover/${data.back_cover}`} alt="" />
              </div>
            </div>
          </div>
          <i className='ellips'>
          <label className="popup">
            <input type="checkbox" />
            <div className="burger" tabindex="0">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <nav className="popup-window">
              <legend>Actions</legend>
              <ul>
                <li>
                  <button onClick={() => navigaToBookDetail(data.id)}>
                    <svg stroke-linejoin="round" stroke-linecap="round" stroke-width="2" stroke="currentColor" fill="none" viewBox="0 0 24 24" height="14" width="14" xmlns="http://www.w3.org/2000/svg">
                      <polygon points="16 3 21 8 8 21 3 21 3 16 16 3"></polygon>
                    </svg>
                    <span>Edit</span>
                  </button>
                </li>
                <hr />
                <li>
                <button onClick={() => handleDeleteDataBuku(data.id)}>
                  <svg stroke-linejoin="round" stroke-linecap="round" stroke-width="2" stroke="currentColor" fill="none" viewBox="0 0 24 24" height="14" width="14" xmlns="http://www.w3.org/2000/svg">
                    <line y2="18" x2="6" y1="6" x1="18"></line>
                    <line y2="18" x2="18" y1="6" x1="6"></line>
                  </svg>
                  <span>Delete</span>
                </button>
                </li>
              </ul>
            </nav>
          </label>
          </i>
        </div>
        <div className='file-bottom'>
          <H5 attrH5={{ className: 'mb-0 mt-2' }} ><b>{data.judul}</b></H5>
          <hr />
          <P attrPara={{ className: 'mb-0' }}><b>{'Penulis'} : </b>{data.penulis}</P>
          <P attrPara={{ className: 'mb-0 mb-1' }}><b>{'Penerbit'} : </b>{data.penerbit}</P>
          <P>
            <b>{'Create At'} : </b>
            {data.create_at}
          </P>
        </div>
      </LI>
    );
  });
      
  const navigaToCreate = () => {
    navigate(`${process.env.PUBLIC_URL}/dashboard/buku/add`);
  };
  
  const navigaToBookDetail = (id) => {
    navigate(`${process.env.PUBLIC_URL}/dashboard/buku/detail/`+id);
  };

  return (
    <Fragment>
      <CardHeader>
        <Media>
          <Form className='search-file form-inline'>
            <div className='mb-0 form-group'>
              <i className='fa fa-search'></i>
              <input className='form-control-plaintext' type='text' value={searchTerm} onChange={(e) => handleChange(e)} placeholder='Search...' />
            </div>
          </Form>
          <Media body className='text-end'>
              <div className='btn btn-primary' onClick={navigaToCreate}>
                <PlusSquare />
                Add New Book
              </div>
          </Media>
        </Media>
      </CardHeader>
      {filelist.length ? (
        <CardBody className='file-manager'>
          <H4 attrH4={{ className: 'mb-3' }}>All Book</H4>
          <UL attrUL={{ className: 'simple-list files' }}> {filelist}</UL>
        </CardBody>
      ) : (
        <Image attrImage={{ className: 'img-fluid m-auto', src: errorImg, alt: '' }} />
      )}
    </Fragment>
  );
};
export default BookData;
