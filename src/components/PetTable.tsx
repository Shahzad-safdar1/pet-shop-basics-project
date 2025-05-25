
import React from 'react';
import { Pet } from '../types/Pet';

interface PetTableProps {
  pets: Pet[];
  onEdit: (pet: Pet) => void;
  onDelete: (id: number) => void;
}

const PetTable: React.FC<PetTableProps> = ({ pets, onEdit, onDelete }) => {
  if (pets.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🐾</div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No pets found</h3>
        <p className="text-gray-500">Add your first pet to get started!</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b-2 border-gray-200">
            <th className="text-left p-4 font-semibold text-gray-700">Pet Name</th>
            <th className="text-left p-4 font-semibold text-gray-700">Color</th>
            <th className="text-left p-4 font-semibold text-gray-700">Category</th>
            <th className="text-left p-4 font-semibold text-gray-700">Quantity</th>
            <th className="text-left p-4 font-semibold text-gray-700">Age</th>
            <th className="text-left p-4 font-semibold text-gray-700">Gender</th>
            <th className="text-left p-4 font-semibold text-gray-700">Weight (kg)</th>
            <th className="text-left p-4 font-semibold text-gray-700">Price</th>
            <th className="text-left p-4 font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pets.map((pet, index) => (
            <tr 
              key={pet.id} 
              className={`border-b hover:bg-gray-50 transition-colors duration-200 ${
                index % 2 === 0 ? 'bg-white' : 'bg-gray-25'
              }`}
            >
              <td className="p-4 font-medium text-gray-800">{pet.name}</td>
              <td className="p-4 text-gray-600">{pet.color}</td>
              <td className="p-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  pet.category === 'Dog' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-orange-100 text-orange-800'
                }`}>
                  {pet.category}
                </span>
              </td>
              <td className="p-4 text-gray-600">{pet.quantity}</td>
              <td className="p-4 text-gray-600">{pet.age} years</td>
              <td className="p-4 text-gray-600">{pet.gender}</td>
              <td className="p-4 text-gray-600">{pet.weight}</td>
              <td className="p-4 font-semibold text-green-600">{pet.price}</td>
              <td className="p-4">
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEdit(pet)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors duration-200 transform hover:scale-105"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(pet.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors duration-200 transform hover:scale-105"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PetTable;
