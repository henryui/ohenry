import React, { useEffect, useState, createContext } from 'react';
import axios from 'axios';
import { message } from 'antd';

type Grades = 4 | 5 | 6 | 7 | 8 | 9;

type FormContextType = {
  loading: boolean;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  parentName: string;
  setParentName: React.Dispatch<React.SetStateAction<string>>;
  phone: string;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
  studentName: string;
  setStudentName: React.Dispatch<React.SetStateAction<string>>;
  grade: Grades;
  setGrade: React.Dispatch<React.SetStateAction<Grades>>;
  address: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
};

const FormContext = createContext<FormContextType>(null);

export const FormContextProvider: React.FC = ({ children }) => {
  // Status Updates
  const [loading, setLoading] = useState(false);

  // States
  const [email, setEmail] = useState('');
  const [parentName, setParentName] = useState('');
  // TODO: validate phone number
  const [phone, setPhone] = useState('');
  const [studentName, setStudentName] = useState('');
  const [grade, setGrade] = useState<Grades>();
  const [address, setAddress] = useState('');

  // TODO: Fetch class list from BE
  const [classes, setClasses] = useState();

  // Functions

  // # Region Private

  // # Region Public

  // Effects
  useEffect(() => {
    //
  }, []);

  return (
    <FormContext.Provider
      value={{
        // Status Updates
        loading,
        // States
        email,
        setEmail,
        parentName,
        setParentName,
        phone,
        setPhone,
        studentName,
        setStudentName,
        grade,
        setGrade,
        address,
        setAddress,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormContext;
