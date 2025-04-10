import React, { useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './MouseTracker.module.scss';

const cn = classNames.bind(styles);

function MouseTracker() {
    const sendLog = async (log) => {
        try {
            await axios.post('http://localhost:5050/behaviour/mouse-event', log);
            console.log('Log sent:', log);
        } catch (error) {
            console.error('Error sending log:', error);
        }
    };

    useEffect(() => {
        const handleMove = (e) => {
            const log = {
                event_type: 'mousemove',
                x: e.clientX,
                y: e.clientY,
                timestamp: Date.now(),
                userID: '123',
            };
            sendLog(log);
        };

        const handleClick = (e) => {
            const log = {
                event_type: 'click',
                x: e.clientX,
                y: e.clientY,
                timestamp: Date.now(),
                userID: '123',
            };
            sendLog(log);
        };

        document.addEventListener('mousemove', handleMove);
        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('mousemove', handleMove);
            document.removeEventListener('click', handleClick);
        };
    }, []);

    return <div className={cn('wrapper')}>MouseCheck</div>;
}

export default MouseTracker;
