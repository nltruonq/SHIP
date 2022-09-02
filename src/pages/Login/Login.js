import styles from './Login.module.scss';
import classNames from 'classnames/bind';

import { useEffect, useState } from 'react';

import RocketSpline from '../../components/RocketSpline/RocketSpline';
import Signin from './components/Signin/Signin';
import Signup from './components/Signup/Signup';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Login() {
    const [isSignin, setIsSignin] = useState(true);

    const handleChangeSign = () => {
        setIsSignin(!isSignin);
    };

    const user = useSelector((state) => state.auth.login?.currentUser);

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
        // eslint-disable-next-line
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('rocket')}>
                <RocketSpline />
            </div>
            {isSignin === true ? (
                <Signin handleChangeSign={handleChangeSign} />
            ) : (
                <Signup handleChangeSign={handleChangeSign} />
            )}
        </div>
    );
}

export default Login;
