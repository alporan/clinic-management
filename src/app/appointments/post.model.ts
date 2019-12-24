export interface GetObj {
  patient: {
    id: number,
    name: number,
    surname: number
  };
  doctor: {
    id: number,
    name: number,
    surname: number
  };
  appointmentDate: Date;
  id: number;
}

export interface DeleteObj {
  id: number;
}

export interface PostObj {
  patientid: string;
  doctorid: string;
  appointmentDate: Date;
  id: number;
}

export interface DateObj {
  appointmentDate: Date;
}
