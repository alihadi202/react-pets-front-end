import { useState, useEffect } from 'react';

import * as petService from './services/petService';

//components
import PetList from './components/PetList';
import PetDetails from './components/PetDetails';
import PetForm from './components/PetForm';

const App = () => {
  const [petList, setPetList] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const pets = await petService.index();
        // Don't forget the pass the error object to the new Error
        if (pets.error) {
          throw new Error(pets.error);
        }
  
        setPetList(pets);
      } catch (error) {
        // Log the error object
        console.log(error);
      }
    };
    fetchPets();
  }, []);

  const updateSelected = (pet) => {
    setSelected(pet)
  }

  const handleFormView = (pet) => {
    if (!pet.name) setSelected(null);
    setIsFormOpen(!isFormOpen);
  };


  const handleAddPet = async (formData) => {
    try {
      const newPet = await petService.create(formData);
  
      if (newPet.error) {
        throw new Error(newPet.error);
      }
  
      setPetList([newPet, ...petList]);
      setIsFormOpen(false);
    } catch (error) {
      // Log the error to the console
      console.log(error);
    }
  };



const handleUpdatePet = async (formData, petId) => {
  try {
    const updatedPet = await petService.update(formData, petId);

    // handle potential errors
    if (updatedPet.error) {
      throw new Error(updatedPet.error);
    }

    const updatedPetList = petList.map((pet) =>
      // If the id of the current pet is not the same as the updated pet's id, return the existing pet. If the id's match, instead return the updated pet.
      pet._id !== updatedPet._id ? pet : updatedPet
    );
    // Set petList state to this updated array
    setPetList(updatedPetList);
    // If we don't set selected to the updated pet object, the details page will reference outdated data until the page reloads.
    setSelected(updatedPet);
    setIsFormOpen(false);
  } catch (error) {
    console.log(error);
  }
};

const handleRemovePet = async (petId) => {
  try {
    const deletedPet = await petService.deletePet(petId);

    if (deletedPet.error) {
      throw new Error(deletedPet.error);
    }

    setPetList(petList.filter((pet) => pet._id !== petId));
    setSelected(null);
    setIsFormOpen(false);
  } catch (error) {
    console.log(error);
  }
};

  return (
  <>
  <PetList petList={petList} 
  updateSelected={updateSelected}
  handleFormView={handleFormView} 
  isFormOpen={isFormOpen}/>

  {isFormOpen ? (
    <PetForm handleAddPet={handleAddPet} handleUpdatePet={handleUpdatePet} selected={selected} />
  ) : (
    <PetDetails selected={selected} handleFormView={handleFormView} handleRemovePet={handleRemovePet} />
    )}

  </>
  );
};

export default App;