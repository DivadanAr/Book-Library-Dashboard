import axios from 'axios';
import { Fragment, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { H4, Btn } from '../../../../AbstractElements';
import { CardBody, CardHeader, Form, Input, Row, Col, FormGroup, Label } from 'reactstrap';
import Dropzone from 'react-dropzone-uploader';
import { useNavigate } from "react-router-dom";

const BookForm = () => {
const navigator = useNavigate();
  const [selectedCover, setSelectedCover] = useState(null);
  const [selectedBackCover, setSelectedBackCover] = useState(null);
  const [genre, setGenre] = useState([]);
  const [kategori, setKategori] = useState([]);
  const [judul, setJudul] = useState("");
  const [penulis, setPenulis] = useState("");
  const [penerbit, setPenerbit] = useState("");
  const [tahunTerbit, setTahunTerbit] = useState("");
  const [jumlahHalaman, setJumlahHalaman] = useState("");
  const [stokBuku, setStokBuku] = useState("");
  const [deskripsi, setDeskripsi] = useState("");

  useEffect(() => {
    handleKategori();
  }, []);

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


    const handleChangeCover = ({ meta, file }, status) => {
        setSelectedCover(file)
    };


    const handleChangeBackCover = ({ meta, file }, status) => {
        setSelectedBackCover(file)
    };
    
    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("cover", selectedCover);
        formData.append("backcover", selectedBackCover);
        formData.append("judul", judul)
        formData.append("kategoriId", kategori)
        formData.append("penulis", penulis)
        formData.append("penerbit", penerbit)
        formData.append("tahunterbit", tahunTerbit)
        formData.append("jumlahhalaman", jumlahHalaman)
        formData.append("stokbuku", stokBuku)
        formData.append("deskripsi", deskripsi)

        try {
            const response = await axios.post("http://127.0.0.1:9000/api/buku/store", formData, {
                headers: {"Content-Type": "multipart/form-data"}
            })

            if (response.status >= 200 && response.status < 300) {
                navigator(`${process.env.PUBLIC_URL}/dashboard/buku/`);
            } else {
                toast.error("Terjadi Kesalahan!..");
            }
            } catch (error) {
            console.error("An error occurred:", error);
            toast.error("Terjadi Kesalahan!..");
            }
      
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
                            <Input className="form-control" name='judul' type="text" placeholder="Masukan Judul Buku" onChange={(e)=> setJudul(e.target.value)}/>
                        </FormGroup>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <FormGroup>
                            <Label htmlFor="exampleInputPassword2">Genre</Label>
                            <Input type="select" name="kalegoriId" className="form-control digits" onChange={(e)=> setKategori(e.target.value)} >
                                {/* <option value="" selected="" disabled="" hidden="">Pilih Kategori Buku Yang Sesuai</option> */}
                                {
                                    genre.map((data, i) => {
                                        return <option value={data.id}>{data.kategori}</option>
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
                            <Input className="form-control" type="text" name='penulis' placeholder="Masukan Nama Penulis Buku" onChange={(e)=> setPenulis(e.target.value)} />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormGroup>
                            <Label htmlFor="exampleFormControlSelect9">Penerbit</Label>
                            <Input className="form-control" type="text" name='penerbit' placeholder="Masukan Penerbit Buku" onChange={(e)=> setPenerbit(e.target.value)} />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormGroup>
                            <Label htmlFor="exampleFormControlSelect3">Tahun Terbit</Label>
                            <Input className="form-control" type="text" name='tahunterbit' placeholder="Masukan Tahun Terbit Buku" onChange={(e)=> setTahunTerbit(e.target.value)} />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormGroup>
                            <Label htmlFor="exampleFormControlSelect3">Jumlah Halaman</Label>
                            <Input className="form-control" type="number" name='jumlahhalaman' placeholder="Masukan Jumlah Halaman Buku" onChange={(e)=> setJumlahHalaman(e.target.value)} />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormGroup>
                            <Label htmlFor="exampleFormControlSelect3">Stok Buku</Label>
                            <Input className="form-control" type="number" name='jumlahhalaman' placeholder="Masukan Stok Buku" onChange={(e)=> setStokBuku(e.target.value)} />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormGroup>
                            <Label htmlFor="exampleFormControlSelect3">Deskripsi Buku</Label>
                            <Input className="form-control" type="text" name='jumlahhalaman' placeholder="Masukan Deskripsi Buku" onChange={(e)=> setDeskripsi(e.target.value)} />
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
                        <Btn attrBtn={{ className: 'd-block w-100 mt-2', color: 'danger', type: 'button', onclick:{navigate} }}>Back</Btn>
                    </Col>
                    <Col sm="2">
                        <Btn attrBtn={{ className: 'd-block w-100 mt-2', color: 'primary', type: 'button', onClick: (e) => handleSubmit(e) }}>Add</Btn>
                    </Col>
                </Row>
        </CardBody>
    </Fragment>
  );
};
export default BookForm;
