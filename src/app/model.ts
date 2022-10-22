export interface AcademicYearRegistration {
  id: number,
  academic_year: number,
  academic_program: string,
  renewed: boolean
}

export interface Student {
  id: number,
  username: string,
  password: string
}

export interface RegistrationForm {
  groupsOdd: Group[]
  groupsEven: Group[]
  subjects: Subject[]
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

