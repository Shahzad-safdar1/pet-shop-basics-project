
import React, { useState, useEffect } from 'react';
import PetTable from '../components/PetTable';
import AddPetModal from '../components/AddPetModal';
import EditPetModal from '../components/EditPetModal';
import { Pet } from '../types/Pet';

const API_BASE_URL = 'http://localhost:3001/api';

const Index = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingPet, setEditingPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch pets from database
  const fetchPets = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching pets from:', `${API_BASE_URL}/pets`);
      const response = await fetch(`${API_BASE_URL}/pets`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Pets fetched successfully:', data);
      setPets(data);
    } catch (error) {
      console.error('Error fetching pets:', error);
      setError('Failed to load pets. Make sure the backend server is running on port 3001.');
    } finally {
      setLoading(false);
    }
  };

  // Load pets on component mount
  useEffect(() => {
    fetchPets();
  }, []);

  const handleAddPet = async (newPet: Omit<Pet, 'id'>) => {
    try {
      console.log('Adding new pet:', newPet);
      const response = await fetch(`${API_BASE_URL}/pets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPet),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Pet added successfully:', result);
      
      // Refresh the pets list
      await fetchPets();
      setIsAddModalOpen(false);
    } catch (error) {
      console.error('Error adding pet:', error);
      setError('Failed to add pet. Please try again.');
    }
  };

  const handleEditPet = async (updatedPet: Pet) => {
    try {
      console.log('Updating pet:', updatedPet);
      const response = await fetch(`${API_BASE_URL}/pets/${updatedPet.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPet),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Pet updated successfully:', result);
      
      // Refresh the pets list
      await fetchPets();
      setIsEditModalOpen(false);
      setEditingPet(null);
    } catch (error) {
      console.error('Error updating pet:', error);
      setError('Failed to update pet. Please try again.');
    }
  };

  const handleDeletePet = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this pet?')) {
      try {
        console.log('Deleting pet with id:', id);
        const response = await fetch(`${API_BASE_URL}/pets/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Pet deleted successfully:', result);
        
        // Refresh the pets list
        await fetchPets();
      } catch (error) {
        console.error('Error deleting pet:', error);
        setError('Failed to delete pet. Please try again.');
      }
    }
  };

  const openEditModal = (pet: Pet) => {
    setEditingPet(pet);
    setIsEditModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading pets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-blue-500">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">🐾</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Pet Online Shop</h1>
                <p className="text-gray-600">Manage your pet inventory</p>
              </div>
            </div>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center space-x-2"
            >
              <span className="text-lg">+</span>
              <span>Add New Pet</span>
            </button>
          </div>
        </div>
      </header>

      {/* Error Message */}
      {error && (
        <div className="container mx-auto px-4 py-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p>{error}</p>
            <button 
              onClick={() => setError(null)}
              className="ml-2 text-red-800 hover:text-red-900"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-blue-500 to-orange-500">
            <h2 className="text-2xl font-bold text-white">Pet Inventory</h2>
          </div>
          
          <div className="p-6">
            <PetTable 
              pets={pets} 
              onEdit={openEditModal}
              onDelete={handleDeletePet}
            />
          </div>
        </div>
      </main>

      {/* Modals */}
      <AddPetModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddPet}
      />

      <EditPetModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingPet(null);
        }}
        onEdit={handleEditPet}
        pet={editingPet}
      />
    </div>
  );
};

export default Index;
