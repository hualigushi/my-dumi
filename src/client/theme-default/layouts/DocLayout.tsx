import { Link, Outlet } from 'umi';
import { useNavData } from '@/client/theme-api/useNavData';
import styles from './index.less';

export default function Layout() {
  const nav = useNavData()
  console.log("qly ~ Layout ~ nav:", nav)
  return (
    <div className={styles.navs}>
      <ul>
          {nav.map((item: any) => (<li key={item.link}>
              <Link style={{ marginRight: '10px' }} to={item.link}>{item.title}</Link>
          </li>))}
      </ul>
      <Outlet />
    </div>
  );
}