'use client';

import { AnamneseFormData } from "../schemas/anamnese-schema";

export const initialAnamneseFormValues: AnamneseFormData = {
  patientName: '',
  emergencyContactName: '',
  emergencyContact: '',
  clinicalDiagnosis: '',
  mainComplaint: '',
  pain: '',
  surgery: '',
  medicines: '',
  physicalActivity: '',
  additionalInfo: '',
  observation: '',
  pathologies: [],
};