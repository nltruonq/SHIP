import styles from './User.module.scss';
import classNames from 'classnames/bind';
import Header from '../../components/Header/Header';

const cx = classNames.bind(styles);

function User() {
    return (
        <div className={cx('user')}>
            <div className={cx('wrapper')}>
                <Header />
            </div>
        </div>
    );
}

export default User;
