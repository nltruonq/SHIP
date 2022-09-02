import styles from './Game.module.scss';
import classNames from 'classnames/bind';

import { useForm } from 'react-hook-form';

import Header from '../../components/Header/Header';

import React, { useContext, useEffect, useState } from 'react';

import { SocketContext } from '../../socket/socket';

import Square from './components/Square/Square';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const listTarget = [];
let shipLocationArray = [];
let enemyLocationArray = [];
let point = 0;

function Game() {
    const [messageList, setMessageList] = useState([]);

    const [start, setStart] = useState(false);

    const [win, setWin] = useState(false);

    const [fire, setFire] = useState(false);

    const socket = useContext(SocketContext);

    const navigate = useNavigate();

    socket.on('message', (message) => {
        setMessageList([...messageList, message]);
    });

    socket.on('enemyLocationArray', (enemy) => {
        enemyLocationArray = enemy;
    });

    socket.on('fire', (mess) => {
        setFire(() => true);
    });

    socket.on('you-first', () => {
        const btn = document.querySelector('#first');
        btn.classList.add(cx('hide'));
        setFire(() => true);
    });

    socket.on('win', (mess) => {
        alert('ban thua roi!!!!!!');
        navigate('/');
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        socket.emit('message', data.message);
        setMessageList([...messageList, data.message + '$$OWNER$$']);
        document.querySelector('.input-message input').value = '';
    };

    const [matrix, setMatrix] = useState([
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
    ]);

    const ship = ['red', 'blue', 'yellow', 'green', 'pink'];

    const handleStartGame = () => {
        listTarget.forEach((target) => {
            const x = target.dataset.key.slice(1, 2);
            const y = target.dataset.key.slice(3, 4);
            shipLocationArray.push([x, y]);
        });
        socket.emit('shipLocationArray', shipLocationArray);
        listTarget.forEach((target) => {
            target.classList.remove(target.classList[1]);
        });

        const btn = document.querySelectorAll('#table-ship-btn');
        btn.forEach((b) => {
            b.classList.add(cx('hide'));
        });

        setStart(true);
    };

    const handleSetAgain = () => {
        listTarget.forEach((target) => {
            target.classList.remove(target.classList[1]);
        });
        listTarget.splice(0, listTarget.length);
        setStart(false);
    };

    const handleFire = (e) => {
        if (start && fire) {
            const x = e.target.dataset.key.slice(1, 2);
            const y = e.target.dataset.key.slice(3, 4);
            const goal = shipLocationArray.some((ship) => {
                if (ship[0] === x && ship[1] === y) {
                    return true;
                }
            });
            console.log('goal: ', goal);
            if (goal) {
                shipLocationArray.forEach((ship, index) => {
                    if (ship[0] === x && ship[1] === y) {
                        shipLocationArray.splice(index, 1);
                    }
                });
                e.target.classList.add('red');
                console.log('shipLA: ', shipLocationArray);
                point++;
                if (point === 5) {
                    alert('ban da thang roi!!');
                    socket.emit('win', 'haha');
                    navigate('/');
                } else {
                    alert('ban trung muc tieu roi!!');
                }
            } else {
                e.target.classList.add('gray');
                alert('ban da ban hut roi :)))');
            }
            socket.emit('fire', 'your turn');
            setFire(() => false);
        } else if (start && !fire) {
            alert('it not your turn!');
        }
    };

    const handleFirstFire = () => {
        const btn = document.querySelector('#first');
        btn.classList.add(cx('hide'));
        socket.emit('you-first', '');
    };

    useEffect(() => {
        if (fire) {
            alert('your turn');
        }
    });

    return (
        <div className={cx('game')}>
            <Header />
            <div className={cx('wrapper')}>
                <div className={cx('table')}>
                    {matrix.map((row, rowIndex) => {
                        return (
                            <div key={rowIndex} className={cx('row')}>
                                {row.map((cell, cellIndex) => {
                                    return (
                                        <Square
                                            handleFire={handleFire}
                                            start={start}
                                            listTarget={listTarget}
                                            setStart={setStart}
                                            dataKey={`(${rowIndex},${cellIndex})`}
                                            key={`(${rowIndex},${cellIndex})`}
                                        />
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
                <div className={cx('table-ship')}>
                    {!start ? (
                        ship.map((color, index) => {
                            return (
                                <Square
                                    listTarget={listTarget}
                                    setStart={setStart}
                                    draggable={true}
                                    color={color}
                                    key={index}
                                />
                            );
                        })
                    ) : (
                        <>
                            <button id="table-ship-btn" onClick={handleStartGame} className={cx('start-game')}>
                                Start Game
                            </button>
                            <button id="table-ship-btn" onClick={handleSetAgain} className={cx('start-game')}>
                                Set Again
                            </button>
                            <button id="first" onClick={handleFirstFire} className={cx('start-game')}>
                                Me First
                            </button>
                        </>
                    )}
                </div>
                <div className={cx('form-message')}>
                    <div className={cx('content-message')}>
                        {messageList.map((mess, index) => {
                            return (
                                <li className={cx({ 'is-my-message': mess.indexOf('$$OWNER$$') !== -1 })} key={index}>
                                    {mess.indexOf('$$OWNER$$') === -1 ? mess : mess.split('$$OWNER$$')[0]}
                                </li>
                            );
                        })}
                    </div>
                    <form className={cx('form')} onSubmit={handleSubmit(onSubmit)}>
                        <div className={cx('input-message')}>
                            <input placeholder="Nhắn tin..." {...register('message', { required: true })} />
                            <p>{errors.message?.type === 'required' ? 'Không được bỏ trống' : ''}</p>
                        </div>
                        <button type="submit" className={cx('action')}>
                            Gửi
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Game;
