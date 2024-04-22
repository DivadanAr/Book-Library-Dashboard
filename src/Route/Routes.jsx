// dashbaord
import Dashboard from "../pages/dashboard/Default";
import User from "../pages/dashboard/userManagement";
import Logins from '../pages/dashboard/login';
import Buku from '../pages/dashboard/book';
import Peminjaman from '../pages/dashboard/peminjaman';
import PeminjamanRequest from '../pages/dashboard/peminjaman-request';
import PeminjamanApprove from '../pages/dashboard/peminjaman-approve';
import PeminjamanBorrowed from '../pages/dashboard/peminjaman-borrowed';
import PeminjamanReturn from '../pages/dashboard/peminjaman-return';
import PeminjamanDone from '../pages/dashboard/peminjaman-done';
import PeminjamanReject from '../pages/dashboard/peminjaman-reject';
import BukuAdd from '../pages/dashboard/book/bookCreate';
import BukuDetail from '../pages/dashboard/book/bookDetail';

export const routes = [
  { path: `${process.env.PUBLIC_URL}/login`, Component: <Logins /> },
  { path: `${process.env.PUBLIC_URL}/register`, Component: <Logins /> },
  { path: `${process.env.PUBLIC_URL}/dashboard/`, Component: <Peminjaman /> },
  { path: `${process.env.PUBLIC_URL}/dashboard/users/`, Component: <User /> },
  { path: `${process.env.PUBLIC_URL}/dashboard/buku/`, Component: <Buku /> },
// { path: `${process.env.PUBLIC_URL}/dashboard/peminjaman/`, Component: <Peminjaman /> },
  { path: `${process.env.PUBLIC_URL}/dashboard/peminjaman/request/`, Component: <PeminjamanRequest /> },
  { path: `${process.env.PUBLIC_URL}/dashboard/peminjaman/approve/`, Component: <PeminjamanApprove /> },
  { path: `${process.env.PUBLIC_URL}/dashboard/peminjaman/borrowed/`, Component: <PeminjamanBorrowed /> },
  { path: `${process.env.PUBLIC_URL}/dashboard/peminjaman/return/`, Component: <PeminjamanReturn /> },
  { path: `${process.env.PUBLIC_URL}/dashboard/peminjaman/done/`, Component: <PeminjamanDone /> },
  { path: `${process.env.PUBLIC_URL}/dashboard/peminjaman/reject/`, Component: <PeminjamanReject /> },
  { path: `${process.env.PUBLIC_URL}/dashboard/buku/add/`, Component: <BukuAdd /> },
  { path: `${process.env.PUBLIC_URL}/dashboard/buku/detail/:id`, Component: <BukuDetail /> },
];
