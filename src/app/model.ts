export interface AcademicYearRegistration {
  id: number,
  academicYear: number,
  academicProgram: string,
  renewed: boolean
}

export interface AcceptedRegistration {
  message: string
}

export interface Student {
  id: number,
  username: string,
  password: string
}

export interface AcademicProgram {
  id: number,
  name: string,
  code: string
}

export interface RegistrationForm {
  groupsOdd: Group[]
  groupsEven: Group[]
  subjectsOdd: Subject[]
  subjectsEven: Subject[]
}

export interface Group {
  id: number,
  name: string,
  subjects: Subject[]
}

export interface Subject {
  id: number,
  name: string,
  academic_year: number
}

export interface JWT {
  jwt: string
}

