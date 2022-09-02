import styles from './Home.module.scss';
import classNames from 'classnames/bind';

import { useSelector } from 'react-redux';

import Header from '../../components/Header/Header';

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import React, { useContext, useEffect } from 'react';

import { SocketContext } from '../../socket/socket';

const cx = classNames.bind(styles);

function Home() {
    const socket = useContext(SocketContext);
    const user = useSelector((state) => state.auth.login?.currentUser);
    // const userList = useSelector((state) => state.user.users?.allUsers);

    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
        // eslint-disable-next-line
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        socket.emit('join-room', data.room);
        navigate('/game');
    };

    return (
        <div className={cx('home')}>
            <div className={cx('wrapper')}>
                <Header />
                <div className={cx('content')}>
                    <div className={cx('describe')}>
                        <p className={cx('title')}>Best Highlights Of The Latest</p>
                        <p className={cx('describe-content')}>Thật ra thì cũng chẳng có gì để đọc đâu!</p>
                    </div>
                    <div className={cx('btn-game')}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className={cx('input-room')}>
                                <input
                                    placeholder="Nhập mã số phòng"
                                    {...register('room', { required: true, minLength: 4 })}
                                />
                                <p>
                                    {errors.room?.type === 'required'
                                        ? 'Không được bỏ trống'
                                        : errors.room?.type === 'minLength'
                                        ? 'Mã số phải có từ 4 chữ số'
                                        : ''}
                                </p>
                            </div>
                            <button type="submit" className={cx('action')}>
                                Play Game
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
