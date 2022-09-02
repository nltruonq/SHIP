import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { LinkContainer } from 'react-router-bootstrap';

import styles from './Header.module.scss';
import classNames from 'classnames/bind';

import brand from '../../assets/image/brand.png';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createAxios } from '../../redux/createInstance';
import { logoutUser } from '../../redux/apiRequest';
import { logoutSuccess } from '../../redux/authSlice';

const cx = classNames.bind(styles);

function Header() {
    const user = useSelector((state) => state.auth.login?.currentUser);
    // const userList = useSelector((state) => state.user.users?.allUsers);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (!user) {
    //         navigate('/login');
    //     }
    //     if (user?.accessToken) {
    //         getAllUser(user?.accessToken, dispatch, axiosJWT);
    //     }
    //     // eslint-disable-next-line
    // }, []);

    let axiosJWT = createAxios(user, dispatch, logoutSuccess);
    const handleLogout = () => {
        logoutUser(dispatch, user._id, navigate, user.accessToken, axiosJWT);
    };

    return (
        <Navbar className={cx('navbar')} collapseOnSelect expand="lg" bg="transparent" variant="light">
            <Container className={cx('container')}>
                <LinkContainer to="/">
                    <Navbar.Brand className={cx('nav-brand')}>
                        <img className={cx('brand')} src={brand} alt="brand" />
                    </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <LinkContainer to="/feature">
                            <Nav.Link className={cx('nav-link-header')}>Tính Năng</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/guide">
                            <Nav.Link className={cx('nav-link-header')}>Hướng Dẫn</Nav.Link>
                        </LinkContainer>
                    </Nav>
                    <Nav>
                        <LinkContainer to="/user">
                            <Nav.Link className={cx('nav-link-header')}>Tên của bạn: {user?.username}</Nav.Link>
                        </LinkContainer>
                        <LinkContainer onClick={handleLogout} to="/login">
                            <Nav.Link className={cx('nav-link-header')}>Đăng Xuất</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
