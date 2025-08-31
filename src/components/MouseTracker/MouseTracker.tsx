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

  // check token from local storage
  // and decode it to get user information
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

  
  // Track mouse clicks and log them
  useEffect(() => {
    if (!user) return;

    const handleClick = (e: MouseEvent) => {
      const now = Date.now();
      const duration = (now - startTime) / 1000;

      let area = '';
      let el = e.target as HTMLElement;
      
      
      while (el && el !== document.body) {
        if (el.dataset.area) {
          area = el.dataset.area;
    
          
          const rect = el.getBoundingClientRect();
          
          
          const xMin = rect.left;      
          const xMax = rect.right;     
          const yMin = rect.top;       
          const yMax = rect.bottom;    
    
          
          const areaCoordinates = {
            [area]: [xMin, xMax, yMin, yMax],
          };
          console.log(JSON.stringify(areaCoordinates));
    
          
          const mouseX = e.clientX;
          const mouseY = e.clientY;
    
          if (mouseX >= xMin && mouseX <= xMax && mouseY >= yMin && mouseY <= yMax) {
            area = el.dataset.area || 'unknown';
          }
    
          break;
        }
        el = el.parentElement!;
      }

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
        area: area || 'unknown',
      };

      console.log('MouseTracker mounted', log);
      setEvents((prev) => [...prev, log]);  
      
      setStartTime(now);
    };

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [startTime, user]);

  
  // logs to astradb
  useEffect(() => {
    if (!user || events.length === 0) return;

    const interval = setInterval(() => {
      if (events.length > 0) {
        callCreateMouseLogToAstra(events)  
        
          .then((res) => {
            console.log('Mouse logs sent to AstraDB:', res.data);
            setEvents([]);  
            
          })
          .catch((err) => {
            console.error('Failed to send mouse logs:', err);
          });
      }
    }, 5000);  
    

    return () => clearInterval(interval);
  }, [events, user]);

  
  // logs to mongodb
  useEffect(() => {
    if (!user || events.length === 0) return;

    const interval = setInterval(() => {
      if (events.length > 0) {
        callCreateMouseLogToMongo(events)  
        
          .then((res) => {
            console.log('Mouse logs sent to MongoDB:', res.data);
            setEvents([]);  
            
          })
          .catch((err) => {
            console.error('Failed to send mouse logs:', err);
          });
      }
    }, 5000);  
    

    return () => clearInterval(interval);
  }, [events, user]);

  return null;
}
