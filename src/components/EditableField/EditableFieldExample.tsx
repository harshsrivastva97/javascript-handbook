import React, { useState } from 'react';
import EditableField from './EditableField';

const EditableFieldExample: React.FC = () => {
  const [name, setName] = useState('John Doe');
  const [title, setTitle] = useState('Software Engineer');
  const [description, setDescription] = useState('Passionate about web development');
  
  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl mt-8">
      <h2 className="text-xl font-semibold mb-4">Editable Field Examples</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name:</label>
          <EditableField 
            value={name} 
            onChange={setName} 
            placeholder="Enter your name"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Job Title:</label>
          <EditableField 
            value={title} 
            onChange={setTitle} 
            placeholder="Enter your job title"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description:</label>
          <EditableField 
            value={description} 
            onChange={setDescription} 
            placeholder="Enter a short description"
            className="w-full"
          />
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-gray-50 rounded-md">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Current Values:</h3>
        <pre className="text-xs text-gray-600">
          {JSON.stringify({ name, title, description }, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default EditableFieldExample; 