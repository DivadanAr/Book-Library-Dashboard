import axios from 'axios';
import { Fragment, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { H4, Btn } from '../../../../AbstractElements';
import { CardBody, CardHeader, Form, Input, Row, Col, FormGroup, Label } from 'reactstrap';
import Dropzone from 'react-dropzone-uploader';
import { useNavigate, useParams } from "react-router-dom";

const BookFormDetail = () => {
const navigator = useNavigate();
  const [selectedCover, setSelectedCover] = useState(null);
  const [selectedBackCover, setSelectedBackCover] = useState(null);
  const [genre, setGenre] = useState([]);
  const [kategori, setKategori] = useState("");
  const [kategoriId, setKategoriId] = useState("");
  const [judul, setJudul] = useState("");
  const [penulis, setPenulis] = useState("");
  const [penerbit, setPenerbit] = useState("");
  const [tahunTerbit, setTahunTerbit] = useState("");
  const [jumlahHalaman, setJumlahHalaman] = useState("");
  const [stokBuku, setStokBuku] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [idBuku, setIdBuku] = useState("");
  const { id } = useParams();

  useEffect(() => {

      handleBuku(id);
     handleKategori();
  }, [id])  ;

    const handleKategori = async () => {
        try {
        const response = await axios.get("http://127.0.0.1:9000/api/kategori/get");
    
        if (response.status >= 200 && response.status < 300) {
            setGenre(response.data.Data.Kategori)
        } else {
            toast.error("Terjadi Kesalahan!..");
        }
        } catch (error) {
        console.error("An error occurred:", error);
        toast.error("Terjadi Kesalahan!..");
        }
    };

    const handleBuku = async (id) => {
        try {
        const response = await axios.get("http://127.0.0.1:9000/api/Buku/detail/"+id);
    
        if (response.status >= 200 && response.status < 300) {
            setJudul(response.data.Data.Buku[0].judul)
            setSelectedCover(response.data.Data.Buku[0].cover)
            setSelectedBackCover(response.data.Data.Buku[0].back_cover)
            setPenulis(response.data.Data.Buku[0].penulis)
            setPenerbit(response.data.Data.Buku[0].penerbit)
            setTahunTerbit(response.data.Data.Buku[0].tahun_terbit)
            setJumlahHalaman(response.data.Data.Buku[0].jumlah_halaman)
            setStokBuku(response.data.Data.Buku[0].stock_buku)
            setDeskripsi(response.data.Data.Buku[0].deskripsi)
            setIdBuku(response.data.Data.Buku[0].id)
            setKategori(response.data.Data.Kategori[0].kategori)
            setKategoriId(response.data.Data.Kategori[0].id)
            console.log(response)
            // setKategoriId(response.data.Data.Kategori[0].id);
        } else {
            toast.error("Terjadi Kesalahan!..");
        }
        } catch (error) {
        console.error("An error occurred:", error);
        toast.error("Terjadi Kesalahan!..");
        }
    };

    const handleChangeCover = ({ meta, file }, status) => {
        setSelectedCover(file)
    };


    const handleChangeBackCover = ({ meta, file }, status) => {
        setSelectedBackCover(file)
    };
    
    const handleChangeKategori = async () => {
        const kategoriIdInt = parseInt(kategoriId, 10);
        const kategory = {
            kategori_id: kategoriIdInt,
        };
                
          try {
            const response = await axios.put("http://127.0.0.1:9000/api/kategori-buku/put/"+idBuku, kategory, {
              headers: {
                "Content-Type": "application/json",
              },
            });
        
            if (response.status >= 200 && response.status < 300) {
                toast.success("Edit Berhasil in!..");
                navigate(`${process.env.PUBLIC_URL}/dashboard/`);
            } else {
              toast.error("You error!..");
            }
          } catch (error) {
            console.error("An error occurred:", error);
            toast.error("error");
          }      
    }

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("cover", selectedCover);
        formData.append("backcover", selectedBackCover);
        formData.append("judul", judul)
        // formData.append("kategoriid", kategoriId)
        formData.append("penulis", penulis)
        formData.append("penerbit", penerbit)
        formData.append("tahunterbit", tahunTerbit)
        formData.append("jumlahhalaman", jumlahHalaman)
        formData.append("stokbuku", stokBuku)
        formData.append("deskripsi", deskripsi)

        try {
            const response = await axios.put("http://127.0.0.1:9000/api/buku/put/"+idBuku, formData, {
                headers: {"Content-Type": "multipart/form-data"}
            })
            // console.log(response);
            if (response.status >= 200 && response.status < 300) {
                handleChangeKategori();
                // navigator(`${process.env.PUBLIC_URL}/dashboard/buku/`);
            } else {
                toast.error("Terjadi Kesalahan!..");
            }
            } catch (error) {
            console.error("An error occurred:", error);
            toast.error("Terjadi Kesalahan!..");
            }

        // const formData = new FormData();
        // formData.append("cover", selectedCover);
        // formData.append("backcover", selectedBackCover);
        // formData.append("judul", judul)
        // formData.append("kategoriId", kategori)
        // formData.append("penulis", penulis)
        // formData.append("penerbit", penerbit)
        // formData.append("tahunterbit", tahunTerbit)
        // formData.append("jumlahhalaman", jumlahHalaman)
        // formData.append("stokbuku", jumlahHalaman)

        // console.log(formData);
        // alert(formData.FormData);
        // try {
        //     const response = await axios.put("http://127.0.0.1:9000/api/buku/put/"+id, formData, {
        //         headers: {"Content-Type": "multipart/form-data"}
        //     })

        //     if (response.status >= 200 && response.status < 300) {
        //         navigator(`${process.env.PUBLIC_URL}/dashboard/buku/`);
        //     } else {
        //         toast.error("Terjadi Kesalahan!..");
        //     }
        //     } catch (error) {
        //     console.error("An error occurred:", error);
        //     toast.error("Terjadi Kesalahan!..");
        //     }
      
        // alert(formData.get);
        // toast.success('Dropzone successfully submitted !');
    };

    const navigate = () => {
        navigator(`${process.env.PUBLIC_URL}/dashboard/buku/`);
    };

  return (
    <Fragment>
        <CardHeader>
            <H4  attrH4={{ className: 'mb-3' }}>Add New Book</H4>
        </CardHeader>
        <CardBody className='file-manager'>
           <Form className="form theme-form">
                <Row>
                    <Col>
                        <FormGroup>
                            <Label htmlFor="exampleFormControlInput1">Judul Buku</Label>
                            <Input className="form-control" name='judul' type="text" placeholder="Masukan Judul Buku" value={judul} onChange={(e)=> setJudul(e.target.value)}/>
                        </FormGroup>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <FormGroup>
                            <Label htmlFor="exampleInputPassword2">Genre</Label>
                            <Input type="select" name="kalegoriId" className="form-control digits" onChange={(e)=> setKategoriId(e.target.value)} >
                            <option value={kategoriId} >{kategori}</option>
                                {/* {
                                    kategori.map((data, i) => {
                                        return <option value={data.id} key={i} selected disabled hidden >{data.kategori}</option>
                                    })
                                } */}
                                {
                                    genre.map((data, i) => {
                                        return <option value={data.id} key={i} >{data.kategori}</option>
                                    })
                                }
                            </Input>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormGroup>
                            <Label htmlFor="exampleInputPassword2">Penulis</Label>
                            <Input className="form-control" type="text" name='penulis' placeholder="Masukan Nama Penulis Buku" value={penulis} onChange={(e)=> setPenulis(e.target.value)} />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormGroup>
                            <Label htmlFor="exampleFormControlSelect9">Penerbit</Label>
                            <Input className="form-control" type="text" name='penerbit' placeholder="Masukan Penerbit Buku" value={penerbit} onChange={(e)=> setPenerbit(e.target.value)} />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormGroup>
                            <Label htmlFor="exampleFormControlSelect3">Tahun Terbit</Label>
                            <Input className="form-control" type="text" name='tahunterbit' placeholder="Masukan Tahun Terbit Buku" value={tahunTerbit} onChange={(e)=> setTahunTerbit(e.target.value)} />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormGroup>
                            <Label htmlFor="exampleFormControlSelect3">Jumlah Halaman</Label>
                            <Input className="form-control" type="number" name='jumlahhalaman' placeholder="Masukan Jumlah Halaman Buku" value={jumlahHalaman} onChange={(e)=> setJumlahHalaman(e.target.value)} />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormGroup>
                            <Label htmlFor="exampleFormControlSelect3">Stok Buku</Label>
                            <Input className="form-control" type="number" name='jumlahhalaman' placeholder="Masukan Stok Buku" value={stokBuku} onChange={(e)=> setStokBuku(e.target.value)} />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormGroup>
                            <Label htmlFor="exampleFormControlSelect3">Deskripsi Buku</Label>
                            <Input className="form-control" type="text" name='jumlahhalaman' placeholder="Masukan Deskripsi Buku" value={deskripsi} onChange={(e)=> setDeskripsi(e.target.value)} />
                        </FormGroup>
                    </Col>
                </Row>

                <Row>
                    <Col sm="6">
                        <Label htmlFor="exampleFormControlSelect3">Cover Depan</Label>
                        <Dropzone
                            onChangeStatus={handleChangeCover}
                            maxFiles={1}
                            multiple={false}
                            canCancel={false}
                            inputContent="Drop A File"
                            styles={{
                                dropzoneActive: { borderColor: 'green' },
                            }}
                        />
                    </Col>
                    <Col sm="6">
                        <Label htmlFor="exampleFormControlSelect3">Cover Belakang</Label>
                        <Dropzone
                                onChangeStatus={handleChangeBackCover}
                                maxFiles={1}
                                multiple={false}
                                canCancel={false}
                                inputContent="Drop A File"
                                styles={{
                                    dropzoneActive: { borderColor: 'green' },
                                }}
                            />
                    </Col>
                </Row>
            </Form>
                <Row style={{justifyContent: "end", display: "flex", marginTop: 30}}>
                    <Col sm="2">
                        <Btn attrBtn={{ className: 'd-block w-100 mt-2', color: 'danger', type: 'button', onClick:(e) => navigate(e) }}>Back</Btn>
                    </Col>
                    <Col sm="2">
                        <Btn attrBtn={{ className: 'd-block w-100 mt-2', color: 'primary', type: 'button', onClick: (e) => handleSubmit(e) }}>Add</Btn>
                    </Col>
                </Row>
        </CardBody>
    </Fragment>
  );
};
export default BookFormDetail;
