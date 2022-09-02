import styles from './Square.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

let target;

function Square({ listTarget, dataKey, draggable, color, setStart, handleFire }) {
    const handleDragStart = (e) => {
        if (!e.target.dataset.key) {
            target = e.target;
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        if (e.target.dataset.key) {
            e.target.classList.add(target.classList[1]);
            target.classList.add(cx('hide'));
            listTarget.push(e.target);
            if (listTarget.length === 5) {
                setStart(true);
            }
        }
    };

    return (
        <div
            draggable={draggable}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={handleFire}
            data-key={dataKey}
            className={cx('square', color)}
        ></div>
    );
}

export default Square;
