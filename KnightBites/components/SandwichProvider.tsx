import React, { createContext, useState, ReactNode } from 'react';
import { Sandwich } from '@/interfaces/Sandwich';

interface SandwichContextProps {
  sandwich: Sandwich;
  setSandwich: React.Dispatch<React.SetStateAction<Sandwich>>;
}

const defaultSandwich: Sandwich = {
  bread: "White",
  protein: [],
  cheese: [],
  veggies: [],
  condiments: [],
  grilled: false,
  instructions: "",
  name: "",
  creator: "",
};

export const SandwichContext = createContext<SandwichContextProps>({
  sandwich: defaultSandwich,
  setSandwich: () => {},
});

export const SandwichProvider = ({ children }: { children: ReactNode }) => {
  const [sandwich, setSandwich] = useState<Sandwich>(defaultSandwich);

  return (
    <SandwichContext.Provider value={{ sandwich, setSandwich }}>
      {children}
    </SandwichContext.Provider>
  );
};