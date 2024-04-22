import React, { Fragment, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, CardHeader, Form, Media } from 'reactstrap';
import { Breadcrumbs } from '../../../AbstractElements';
import HeaderCard from '../../../Components/Common/Component/HeaderCard';
import DataTableUsers from './DataTablePeminjaman';
import axios from 'axios';
import * as XLSX from 'xlsx';

const DataPeminjaman = () => {
  async function exportToExcel() {
    const response = await axios.get('http://127.0.0.1:9000/api/peminjaman/get');
    const dataUser = response.data.Data.Buku;

    const dataPeminjaman = dataUser.map(user => ({
        Nama: user.nama_lengkap,
        Email: user.email,
        Judul: user.judul,
        Penulis: user.penulis,
        Penerbit: user.penerbit,
        Tanggal_Peminjaman: user.tanggal_peminjaman,
        Tanggal_Pengembalian: user.tanggal_pengembalian,
        Status_Peminjaman: user.status_peminjaman
    }));

    const ws = XLSX.utils.json_to_sheet(dataPeminjaman);

    const header = [
        'Nama',
        'Email',
        'Judul',
        'Penulis',
        'Penerbit',
        'Tanggal Peminjaman',
        'Tanggal Pengembalian',
        'Status Peminjaman'
    ];

    ws['!cols'] = [];
    header.forEach((h, i) => {
        const colWidth = dataPeminjaman.reduce((acc, curr) => {
            const cellLength = curr[h] ? curr[h].toString().length : 0;
            return Math.max(acc, cellLength);
        }, h.length);
        ws['!cols'][i] = { wch: colWidth + 5 };
        ws[XLSX.utils.encode_cell({ r: 0, c: i })] = {
          v: h,
          s: {
              font: { bold: true },
              fill: { bgColor: { indexed: 64 }, fgColor: { indexed: 64 } },
              border: {
                  bottom: { style: 'thin', color: { auto: 1 } },
                  right: { style: 'thin', color: { auto: 1 } },
                  top: { style: 'thin', color: { auto: 1 } },
                  left: { style: 'thin', color: { auto: 1 } }
              }
          }
      };
          });

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Peminjaman');
    XLSX.writeFile(wb, 'rekap-peminjaman.xlsx');
}

  useEffect(() => {
    console.log(localStorage.getItem("login"));
    console.log(window.location.href);
  })
  return (
    <Fragment>
      <Breadcrumbs parent="Table" title="Data Peminjaman" mainTitle="Data Peminjaman" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <Media>
                  <HeaderCard title="Data Peminjaman" />
                  <Media body className='text-end'>
                      <div className='btn btn-primary mt-3' onClick={exportToExcel}>
                        Export Data
                      </div>
                  </Media>
                </Media>
              </CardHeader>

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