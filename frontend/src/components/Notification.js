import React, { useContext } from 'react';
import { NotificationContext } from '../contexts/NotificationContext';

const Notification = () => {
    const { notifications } = useContext(NotificationContext);

    return(
        <div className='container'>
            <h2>Notificaciones</h2>
            {notifications.length === 0 ? (
                <p>No tienes notificaciones.</p>
            ) : (
                <ul className='list-group'>
                    {notifications.map(notification => (
                        <li key={notification._id} className='list-group-item'>
                            {notification.message}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Notification;