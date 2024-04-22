import { Fragment, useCallback, useState, useEffect } from 'react'
import DataTable from 'react-data-table-component';
import { Media } from 'reactstrap';
import { Btn, H4, Image } from '../../../AbstractElements';
import userImg from '../../../assets/images/avtar/user.png'
import axios from 'axios';

const DataTableUsers = () => {

    const [dataTable, setDataTable] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [toggleDelet] = useState(false);

    
    const tableColumns = [
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
        // {
        //     name: 'Action',
        //     selector: row => row['action'],
        //     sortable: true,
        //     center: true,
        // },
    ];
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:9000/api/auth/users');
                const dataUser = response.data.Data.User;
    
                // console.log(dataUser);
                const newDataTable = dataUser.map((data, index) => ({
                    id: data.id,
                    account: ( 
                        data.profile_picture == null ? 
                        <Media className='d-flex' style={{ width: '200px' }}>
                            <Image
                            attrImage={{
                                className: 'rounded-circle me-3',
                                src: `${userImg}`,
                                alt: 'Generic placeholder image',
                                style: {
                                    width: '30px',
                                    height: '30px',
                                    objectFit: 'cover'
                                }
                            }}
                            />
                            <Media body className="align-self-center">
                                <div>{data.email}</div>
                            </Media>
                        </Media>:
                        <Media className='d-flex' style={{ width: '200px' }}>
                            <Image
                            attrImage={{
                                className: 'rounded-circle me-3',
                                src: `http://127.0.0.1:9000/api/auth/get-profile/${data.profile_picture}`,
                                alt: 'Generic placeholder image',
                                style: {
                                    width: '30px',
                                    height: '30px',
                                    objectFit: 'cover'
                                }
                            }}
                            />
                            <Media body className="align-self-center">
                                <div>{data.email}</div>
                            </Media>
                        </Media>
                    ),
                    name: data.nama_lengkap === null ? 'Nama Belum Di atur oleh user' : data.nama_lengkap,
                    usname: data.username,
                    gender: (
                        data.jenis_kelamin === "1" ? <span className='badge badge-primary'>Laki-Laki</span> :
                        data.jenis_kelamin === "2" ? <span className='badge badge-danger'>Perempuan</span> :
                        <span className='badge badge-warning'>Tidak Ingin memberi Tahu</span>
                      ),
                    role: data.name_role,
                //     action:( <div className="dropdown-basic">
                //     <Dropdown className="dropdown">
                //       <Btn attrBtn={{ color: 'primary', className: 'dropbtn' }} >{DropdownButton} <span><i className="icofont icofont-arrow-down"></i></span></Btn>
                //       <DropdownMenu className="dropdown-content">
                //         <DropdownItem href="#">{Action}</DropdownItem>
                //         <DropdownItem href="#">{AnotherAction}</DropdownItem>
                //         <DropdownItem href="#">{SomethingElseHere}</DropdownItem>
                //       </DropdownMenu>
                //     </Dropdown>
                //   </div>)
        
                }));
                setDataTable(newDataTable);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, []);
    
    const handleRowSelected = useCallback(state => {
        setSelectedRows(state.selectedRows);
    }, []);

    const handleMultiDelete = async () => {
        if (window.confirm(`Are you sure you want to delete:\r ${selectedRows.map(r => r.usname)}?`)) {
            try {
                const deletePromises = selectedRows.map(async (row) => {
                    await axios.delete(`http://127.0.0.1:9000/api/auth/users/${row.id}`);
                    return row.id;
                });
    
                const deletedIds = await Promise.all(deletePromises);
    
                setDataTable(dataTable.filter((item) => !deletedIds.includes(item.id)));
                setSelectedRows([]);
            } catch (error) {
                console.error('Error deleting data:', error);
            }                
        }
    };
    

    return (
        <Fragment>
            {(selectedRows.length !== 0) &&
                <div className={`d-flex align-items-center justify-content-between bg-light-info p-2`}>
                    <H4 attrH4={{ className: 'text-muted m-0' }}>Delet Selected Data..!</H4>
                    <Btn attrBtn={{ color: 'danger', onClick: () => handleMultiDelete() }}>Delete</Btn>
                </div>
            }
            <DataTable
                data={dataTable}
                columns={tableColumns}
                striped={true}
                center={true}
                pagination
                selectableRows
                onSelectedRowsChange={handleRowSelected}
                clearSelectedRows={toggleDelet}
            />
        </Fragment>
    )
}
export default DataTableUsers