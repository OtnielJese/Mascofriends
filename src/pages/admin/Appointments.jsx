import { useState, useEffect } from 'react'
import { Plus, Search, Pencil, Trash2, X, Calendar, CheckCircle, Clock, XCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import { AppointmentService, PatientService, OwnerService } from '../../services/dataService'

export default function Appointments() {
  const [appointments, setAppointments] = useState([])
  const [patients, setPatients] = useState([])
  const [owners, setOwners] = useState([])
  const [filterStatus, setFilterStatus] = useState('ALL')
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingAppointment, setEditingAppointment] = useState(null)
  const [formData, setFormData] = useState({
    patientId: '',
    ownerId: '',
    appointmentDate: '',
    type: 'CONSULTATION',
    status: 'PENDING',
    notes: ''
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [appointmentsData, patientsData, ownersData] = await Promise.all([
        AppointmentService.getAll(),
        PatientService.getAll(),
        OwnerService.getAll()
      ])
      setAppointments(appointmentsData)
      setPatients(patientsData)
      setOwners(ownersData)
    } catch (error) {
      toast.error('Error al cargar datos')
    } finally {
      setLoading(false)
    }
  }

  const filteredAppointments = filterStatus === 'ALL' 
    ? appointments 
    : appointments.filter(a => a.status === filterStatus)

  const openModal = (appointment = null) => {
    if (appointment) {
      setEditingAppointment(appointment)
      setFormData({
        patientId: appointment.patientId.toString(),
        ownerId: appointment.ownerId.toString(),
        appointmentDate: appointment.appointmentDate.substring(0, 16),
        type: appointment.type,
        status: appointment.status,
        notes: appointment.notes || ''
      })
    } else {
      setEditingAppointment(null)
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      tomorrow.setHours(9, 0, 0, 0)
      
      setFormData({
        patientId: '',
        ownerId: '',
        appointmentDate: tomorrow.toISOString().substring(0, 16),
        type: 'CONSULTATION',
        status: 'PENDING',
        notes: ''
      })
    }
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setEditingAppointment(null)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleOwnerChange = (e) => {
    const ownerId = e.target.value
    setFormData(prev => ({ 
      ...prev, 
      ownerId,
      patientId: ''
    }))
  }

  const getOwnerPatients = () => {
    if (!formData.ownerId) return []
    return patients.filter(p => p.ownerId.toString() === formData.ownerId)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const payload = {
        ...formData,
        patientId: parseInt(formData.patientId),
        ownerId: parseInt(formData.ownerId),
        appointmentDate: formData.appointmentDate + ':00'
      }

      if (editingAppointment) {
        await AppointmentService.update(editingAppointment.id, payload)
        toast.success('Cita actualizada correctamente')
      } else {
        await AppointmentService.create(payload)
        toast.success('Cita creada correctamente')
      }
      closeModal()
      loadData()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al guardar')
    }
  }

  const handleStatusChange = async (id, status) => {
    try {
      await AppointmentService.updateStatus(id, status)
      toast.success('Estado actualizado')
      loadData()
    } catch (error) {
      toast.error('Error al actualizar estado')
    }
  }

  const handleDelete = async (appointment) => {
    if (!confirm('¿Estás seguro de eliminar esta cita?')) {
      return
    }
    try {
      await AppointmentService.delete(appointment.id)
      toast.success('Cita eliminada correctamente')
      loadData()
    } catch (error) {
      toast.error('Error al eliminar')
    }
  }

  const getStatusBadge = (status) => {
    const styles = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      CONFIRMED: 'bg-blue-100 text-blue-800',
      COMPLETED: 'bg-green-100 text-green-800',
      CANCELLED: 'bg-red-100 text-red-800'
    }
    const labels = {
      PENDING: 'Pendiente',
      CONFIRMED: 'Confirmada',
      COMPLETED: 'Completada',
      CANCELLED: 'Cancelada'
    }
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
        {labels[status]}
      </span>
    )
  }

  const getTypeLabel = (type) => {
    const labels = {
      CONSULTATION: 'Consulta',
      BATH_AND_GROOMING: 'Baño y Corte',
      SURGERY: 'Cirugía',
      VACCINATION: 'Vacunación',
      CHECKUP: 'Chequeo General'
    }
    return labels[type] || type
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-vetivet-green"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-800">Citas</h1>
          <p className="text-gray-600">Gestiona las citas y consultas</p>
        </div>
        <button onClick={() => openModal()} className="btn btn-primary">
          <Plus className="w-5 h-5" />
          Nueva Cita
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-wrap gap-2">
          {['ALL', 'PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterStatus === status
                  ? 'bg-vetivet-green text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {status === 'ALL' ? 'Todas' : getStatusBadge(status).props.children}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr className="text-left text-sm text-gray-500">
                <th className="px-6 py-4 font-medium">Fecha y Hora</th>
                <th className="px-6 py-4 font-medium">Mascota</th>
                <th className="px-6 py-4 font-medium">Dueño</th>
                <th className="px-6 py-4 font-medium">Tipo</th>
                <th className="px-6 py-4 font-medium">Estado</th>
                <th className="px-6 py-4 font-medium text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredAppointments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>No hay citas {filterStatus !== 'ALL' && 'con este estado'}</p>
                  </td>
                </tr>
              ) : (
                filteredAppointments.map((apt) => (
                  <tr key={apt.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-800">
                        {new Date(apt.appointmentDate).toLocaleDateString('es-PE', {
                          weekday: 'short',
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(apt.appointmentDate).toLocaleTimeString('es-PE', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-gray-800">{apt.patientName}</td>
                    <td className="px-6 py-4">
                      <p className="text-gray-800">{apt.ownerName}</p>
                      <p className="text-sm text-gray-500">{apt.ownerPhone}</p>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{getTypeLabel(apt.type)}</td>
                    <td className="px-6 py-4">{getStatusBadge(apt.status)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        {apt.status === 'PENDING' && (
                          <button
                            onClick={() => handleStatusChange(apt.id, 'CONFIRMED')}
                            className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"
                            title="Confirmar"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                        {(apt.status === 'PENDING' || apt.status === 'CONFIRMED') && (
                          <button
                            onClick={() => handleStatusChange(apt.id, 'COMPLETED')}
                            className="p-2 text-green-500 hover:bg-green-50 rounded-lg"
                            title="Completar"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => openModal(apt)}
                          className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(apt)}
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-800">
                {editingAppointment ? 'Editar Cita' : 'Nueva Cita'}
              </h2>
              <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dueño *
                </label>
                <select
                  name="ownerId"
                  value={formData.ownerId}
                  onChange={handleOwnerChange}
                  className="input"
                  required
                >
                  <option value="">Seleccionar dueño</option>
                  {owners.map((owner) => (
                    <option key={owner.id} value={owner.id}>
                      {owner.firstName} {owner.lastName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mascota *
                </label>
                <select
                  name="patientId"
                  value={formData.patientId}
                  onChange={handleChange}
                  className="input"
                  required
                  disabled={!formData.ownerId}
                >
                  <option value="">
                    {formData.ownerId ? 'Seleccionar mascota' : 'Primero seleccione un dueño'}
                  </option>
                  {getOwnerPatients().map((patient) => (
                    <option key={patient.id} value={patient.id}>
                      {patient.name} ({patient.species})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha y Hora *
                </label>
                <input
                  type="datetime-local"
                  name="appointmentDate"
                  value={formData.appointmentDate}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Cita *
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="input"
                  required
                >
                  <option value="CONSULTATION">Consulta</option>
                  <option value="BATH_AND_GROOMING">Baño y Corte</option>
                  <option value="SURGERY">Cirugía</option>
                  <option value="VACCINATION">Vacunación</option>
                  <option value="CHECKUP">Chequeo General</option>
                </select>
              </div>

              {editingAppointment && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Estado
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="input"
                  >
                    <option value="PENDING">Pendiente</option>
                    <option value="CONFIRMED">Confirmada</option>
                    <option value="COMPLETED">Completada</option>
                    <option value="CANCELLED">Cancelada</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notas
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  className="input resize-none"
                  placeholder="Motivo de la consulta, observaciones, etc."
                ></textarea>
              </div>

              <div className="flex gap-3 pt-4">
                <button type="button" onClick={closeModal} className="btn btn-secondary flex-1">
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary flex-1">
                  {editingAppointment ? 'Actualizar' : 'Crear'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
