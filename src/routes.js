import Loadable from 'react-loadable';
import Loading from './components/Loading';

export const About = Loadable({
  loader: () => import('./components/About'),
  loading: Loading,
});

export const Other = Loadable({
  loader: () => import('./components/Other'),
  loading: Loading,
});

export const OtherChild = Loadable({
  loader: () => import('./components/OtherChild'),
  loading: Loading,
});