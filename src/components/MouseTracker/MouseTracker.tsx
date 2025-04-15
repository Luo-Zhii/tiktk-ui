import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { callCreateMouseLogToAstra, callCreateMouseLogToMongo } from '../../config/api';

interface DecodedToken {
  _id: string;
  name: string;
  email: string;
  exp: number;
  iat: number;
}

export default function MouseTracker() {
  const [events, setEvents] = useState<any[]>([]);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [user, setUser] = useState<DecodedToken | null>(null);

  // Lấy thông tin user từ token
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);

        if (decoded.exp * 1000 > Date.now()) {
          setUser(decoded);
        }
      } catch (err) {
        console.error('Invalid token');
      }
    }
  }, []);

  // Lắng nghe sự kiện chuột
  useEffect(() => {
    if (!user) return;

    const handleClick = (e: MouseEvent) => {
      const now = Date.now();
      const duration = (now - startTime) / 1000;

      const log = {
        _id: undefined,
        name: user.name,
        userId: user._id,
        email: user.email,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        duration,
        leftClick: e.button === 0,
        rightClick: e.button === 2,
        middleClick: e.button === 1,
        mouseX: e.clientX,
        mouseY: e.clientY,
        scrollX: window.scrollX,
        scrollY: window.scrollY,
      };

      console.log('MouseTracker mounted', log);
      setEvents((prev) => [...prev, log]);  // Thêm log mới vào mảng events
      setStartTime(now);
    };

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [startTime, user]);

  // Gửi logs sau mỗi khoảng thời gian (5s) nếu có sự kiện mới
  useEffect(() => {
    if (!user || events.length === 0) return;

    const interval = setInterval(() => {
      if (events.length > 0) {
        callCreateMouseLogToAstra(events)  // Gửi toàn bộ logs
          .then((res) => {
            console.log('Mouse logs sent:', res.data);
            setEvents([]);  // Xóa logs sau khi gửi thành công
          })
          .catch((err) => {
            console.error('Failed to send mouse logs:', err);
          });
      }
    }, 5000);  // Gửi mỗi 5 giây

    return () => clearInterval(interval);
  }, [events, user]);

  // Gửi logs sau mỗi khoảng thời gian (5s) nếu có sự kiện mới
  useEffect(() => {
    if (!user || events.length === 0) return;

    const interval = setInterval(() => {
      if (events.length > 0) {
        callCreateMouseLogToMongo(events)  // Gửi toàn bộ logs
          .then((res) => {
            console.log('Mouse logs sent:', res.data);
            setEvents([]);  // Xóa logs sau khi gửi thành công
          })
          .catch((err) => {
            console.error('Failed to send mouse logs:', err);
          });
      }
    }, 5000);  // Gửi mỗi 5 giây

    return () => clearInterval(interval);
  }, [events, user]);

  return null;
}
