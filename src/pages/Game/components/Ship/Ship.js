import styles from './Ship.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Ship({ size }) {
    const handleDrag = (e) => {
        // console.log(e.target);
    };

    const handleDrop = (e) => {
        console.log(e.target);
    };

    return <div draggable onDrag={handleDrag} onDragEnter={handleDrop} className={cx(size)}></div>;
}

export default Ship;
