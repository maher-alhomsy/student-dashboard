export type Student = {
  id: string;
  city: string;
  grade: Grade;
  phone: string;
  gender: Gender;
  country: string;
  remarks: string;
  lastName: string;
  firstName: string;
  birthDate: string;
};

type Gender = {
  id: string;
  translations: Translation[];
};

type Translation = {
  name: string;
  cultureCode: 0 | 1;
};

export type Grade = {
  id: string;
  translations: Translation[];
};

export type TransformedStudent = {
  id: string;
  city: string;
  notes: string;
  gender: string;
  country: string;
  lastName: string;
  firstName: string;
  dateOfBirth: string;
  mobileNumber: string;
  educationalLevel: string;
};
