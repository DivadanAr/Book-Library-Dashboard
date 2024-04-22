import React from 'react';
import { Media } from 'reactstrap';
import { Image } from '../../AbstractElements';
import user1 from '../../assets/images/user/1.jpg';

export const dummytabledata = [
    {
        id: 1,
        account: <Media className='d-flex'><Image attrImage={{ className: 'rounded-circle img-30 me-3', src: `${user1}`, alt: 'Generic placeholder image' }} />
            <Media body className="align-self-center">
                <div>sheylaulya@gmail.com</div>
            </Media>
        </Media>,
        name: 'Sheyla Aulya',
        usname: 'sheyyyyy',
        nomor_telepon: '24/04/2006',
        gender: <span className='badge badge-light-danger'>Perempuan</span>,
        role: 'peminjam',
        // action: 
    },
];

export const tableColumns = [
    {
        name: 'Email',
        selector: row => row['account'],
        sortable: true,
        center: true,
    },
    {
        name: 'Nama',
        selector: row => `${row.name}`,
        sortable: true,
        center: false,
    },
    {
        name: 'Username',
        selector: row => `${row.usname}`,
        sortable: true,
        center: true,
    },
    {
        name: 'Jenis Kelamin',
        selector: row => row['gender'],
        sortable: true,
        center: true,
    },
    {
        name: 'Role',
        selector: row => `${row.role}`,
        sortable: true,
        center: true,
    },
    {
        name: 'Action',
        selector: row => row['action'],
        sortable: true,
        center: true,
    },
];