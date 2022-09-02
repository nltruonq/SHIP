import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import 'bootstrap/dist/css/bootstrap.min.css';

import styles from './ToastLogin.module.scss';
import classNames from 'classnames/bind';

import { memo, useState, useEffect } from 'react';

const cx = classNames.bind(styles);

function ToastLogin({ message }) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(true);
    }, [message]);

    return (
        <ToastContainer className={cx('toast-container-custom')} position="middle-end">
            <Toast
                onClose={() => setShow(false)}
                show={show}
                autohide
                delay={2000}
                className={cx('toast-custom')}
                bg="dark"
            >
                <Toast.Header>
                    <strong className="me-auto fs-3">Có lỗi!</strong>
                </Toast.Header>
                <Toast.Body className="fs-3 text-white">{message}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
}

export default memo(ToastLogin);
