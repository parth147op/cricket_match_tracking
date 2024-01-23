// components/TeamInput.js

import React from 'react';

const TeamInput = ({ label, value, onChange }) => {
    return (
        <div>
            <label>{label}</label>
            <input
                type="text"
                value={value}
                onChange={e => onChange(e.target.value)}
                style={{ margin: '20px', padding: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
                placeholder='Enter Team Name'
            />
        </div>
    );
};

export default TeamInput;
