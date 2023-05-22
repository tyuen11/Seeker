export interface Job {
  id?: number;
  companyName: string;
  position: string;
  url: string;
  dateApplied: number;
  status: string;
  uid: number;
  dateModified: string;
  lexorank: string;
}


export interface User {
  id: number;
  containers: string[];
  name: string;
  email: string;
}