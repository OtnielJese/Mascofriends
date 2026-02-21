import api from './api'

export const OwnerService = {
  getAll: () => api.get('/owners').then(res => res.data),
  getById: (id) => api.get(`/owners/${id}`).then(res => res.data),
  search: (query) => api.get('/owners/search', { params: { q: query } }).then(res => res.data),
  create: (owner) => api.post('/owners', owner).then(res => res.data),
  update: (id, owner) => api.put(`/owners/${id}`, owner).then(res => res.data),
  delete: (id) => api.delete(`/owners/${id}`),
}

export const PatientService = {
  getAll: () => api.get('/patients').then(res => res.data),
  getById: (id) => api.get(`/patients/${id}`).then(res => res.data),
  getByOwner: (ownerId) => api.get(`/patients/owner/${ownerId}`).then(res => res.data),
  search: (query) => api.get('/patients/search', { params: { q: query } }).then(res => res.data),
  create: (patient) => api.post('/patients', patient).then(res => res.data),
  update: (id, patient) => api.put(`/patients/${id}`, patient).then(res => res.data),
  delete: (id) => api.delete(`/patients/${id}`),
}

export const AppointmentService = {
  getAll: () => api.get('/appointments').then(res => res.data),
  getById: (id) => api.get(`/appointments/${id}`).then(res => res.data),
  getByOwner: (ownerId) => api.get(`/appointments/owner/${ownerId}`).then(res => res.data),
  getByStatus: (status) => api.get(`/appointments/status/${status}`).then(res => res.data),
  getByDateRange: (start, end) => api.get('/appointments/range', { params: { start, end } }).then(res => res.data),
  create: (appointment) => api.post('/appointments', appointment).then(res => res.data),
  update: (id, appointment) => api.put(`/appointments/${id}`, appointment).then(res => res.data),
  updateStatus: (id, status) => api.patch(`/appointments/${id}/status`, null, { params: { status } }).then(res => res.data),
  delete: (id) => api.delete(`/appointments/${id}`),
}

export const WhatsAppService = {
  getLink: (message, appointmentType, petName) => 
    api.get('/whatsapp/link', { params: { message, appointmentType, petName } }).then(res => res.data),
  getBathLink: () => api.get('/whatsapp/bath').then(res => res.data),
  getConsultationLink: () => api.get('/whatsapp/consultation').then(res => res.data),
}
