export interface Person {
  name: string;
  surname: string;
  id?: number;
}

export interface FormObj {
  name: string;
  surname: string;
  appointmentDate: Date;
  id: number;
}

export interface PostObj {
  patientid: string;
  doctorid: string;
  appointmentDate: Date;
  id: number;
}


export interface Appointment {
  patient: {
    id: number,
    name: string,
    surname: string
  };
  doctor: {
    id: number,
    name: string,
    surname: string
  };
  appointmentDate: Date;
  id: number;
}

export interface Appointment2 {
  patientid: number;
  id: number;
}
