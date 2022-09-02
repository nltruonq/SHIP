import styles from './Signin.module.scss';
import classNames from 'classnames/bind';

import { useForm } from 'react-hook-form';

import { loginUser } from '../../../../redux/apiRequest';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ToastLogin from '../Toast/ToastLogin';

const cx = classNames.bind(styles);

function Signin({ handleChangeSign }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const msg = useSelector((state) => state.auth.msg);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = (user) => {
        loginUser(user, dispatch, navigate);
    };

    return (
        <div className={cx('login')}>
            <div className={cx('wrapper')}>
                {msg && typeof msg !== 'object' && <ToastLogin message={msg} />}

                <div className={cx('title')}>
                    <h2>Đăng nhập</h2>
                </div>
                <div className={cx('content')}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* <label>Tài khoản</label> */}
                        <div className={cx('input-error')}>
                            <input
                                placeholder="Tài khoản"
                                {...register('username', { required: true, minLength: 6 })}
                            />
                            <p>
                                {errors.username?.type === 'required'
                                    ? 'Không được bỏ trống'
                                    : errors.username?.type === 'minLength'
                                    ? 'Mật khẩu phải có từ 6 kí tự'
                                    : ''}
                            </p>
                        </div>
                        {/* <label>Mật khẩu</label> */}
                        <div className={cx('input-error')}>
                            <input
                                type="password"
                                placeholder="Mật khẩu"
                                {...register('password', { required: true, minLength: 6 })}
                            />
                            <p>
                                {errors.password?.type === 'required'
                                    ? 'Không được bỏ trống'
                                    : errors.password?.type === 'minLength'
                                    ? 'Mật khẩu phải có từ 6 kí tự'
                                    : ''}
                            </p>
                        </div>
                        <button className={cx('submit')} type="submit">
                            ĐĂNG NHẬP
                        </button>
                        <button onClick={handleChangeSign} className={cx('signup')}>
                            Bạn chưa có tài khoản?
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signin;
