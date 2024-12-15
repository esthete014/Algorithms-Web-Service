//import React from 'react';
import Splitter, { SplitDirection } from '@devbookhq/splitter'
import './styles.css';
import BasicGroup from './Button.jsx';

const Problems = () => {
    return (
        
            <div style={{ width: '100dvw', height: '100dvh', display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: '5dvh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><BasicGroup/></div>
                <Splitter direction={SplitDirection.Horizontal}>
                <div style={{ padding: '20px', height: '100%' }}>
                        <h3>Задача:</h3>
                        <p>Постановка задачи:</p>
                    </div>
                    <div style={{ padding: '0px', height: '100%' }}>
                    <Splitter direction={SplitDirection.Vertical}>
                        <textarea placeholder="Ваш код..." style={{ width: '100%', height: '80%' }}></textarea>
                        <h3>Консоль:</h3>
                    </Splitter>
                    </div>
                </Splitter>
            </div>
        
    );
};

export default Problems;
