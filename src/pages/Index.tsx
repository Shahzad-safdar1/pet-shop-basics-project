
import React, { useState, useEffect } from 'react';
import PetTable from '../components/PetTable';
import AddPetModal from '../components/AddPetModal';
import EditPetModal from '../components/EditPetModal';
import { Pet } from '../types/Pet';

const Index = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingPet, setEditingPet] = useState<Pet | null>(null);

  // Load sample pets on component mount
  useEffect(() => {
    const samplePets: Pet[] = [
      {
        id: 1,
        name: "Buddy",
        color: "Golden",
        category: "Dog",
        quantity: 1,
        age: 3,
        gender: "Male",
        weight: 25.5,
        price: 500
      },
      {
        id: 2,
        name: "Whiskers",
        color: "Orange",
        category: "Cat",
        quantity: 1,
        age: 2,
        gender: "Female",
        weight: 4.2,
        price: 300
      },
      {
        id: 3,
        name: "Max",
        color: "Black",
        category: "Dog",
        quantity: 1,
        age: 5,
        gender: "Male",
        weight: 30.0,
        price: 450
      }
    ];
    setPets(samplePets);
  }, []);

  const handleAddPet = (newPet: Omit<Pet, 'id'>) => {
    const pet: Pet = {
      ...newPet,
      id: Math.max(...pets.map(p => p.id), 0) + 1
    };
    setPets([...pets, pet]);
    setIsAddModalOpen(false);
  };

  const handleEditPet = (updatedPet: Pet) => {
    setPets(pets.map(pet => pet.id === updatedPet.id ? updatedPet : pet));
    setIsEditModalOpen(false);
    setEditingPet(null);
  };

  const handleDeletePet = (id: number) => {
    if (window.confirm('Are you sure you want to delete this pet?')) {
      setPets(pets.filter(pet => pet.id !== id));
    }
  };

  const openEditModal = (pet: Pet) => {
    setEditingPet(pet);
    setIsEditModalOpen(true);
  };

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
