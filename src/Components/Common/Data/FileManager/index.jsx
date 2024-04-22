import { AlertCircle, Folder, Star, Trash2 } from 'react-feather';

export const SideButtons = [
  {
    className: 'btn btn-light',
    icon: <Folder />,
    title: 'All',
  },
  {
    className: 'btn btn-light',
    icon: <Star />,
    title: 'Starred',
  },
  {
    className: 'btn btn-light',
    icon: <AlertCircle />,
    title: 'Cooming Soon',
  },
  {
    className: 'btn btn-light',
    icon: <Trash2 />,
    title: 'Deleted',
  },
];
