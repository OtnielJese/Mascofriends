import { useState, useEffect } from 'react'
import { Plus, Search, Pencil, Trash2, X, PawPrint } from 'lucide-react'
import toast from 'react-hot-toast'
import { PatientService, OwnerService } from '../../services/dataService'

export default function Patients() {
  const [patients, setPatients] = useState([])
  const [owners, setOwners] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingPatient, setEditingPatient] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    breed: '',
    gender: 'UNKNOWN',
    birthDate: '',
    weight: '',
    color: '',
    medicalNotes: '',
    microchipNumber: '',
    ownerId: ''
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [patientsData, ownersData] = await Promise.all([
        PatientService.getAll(),
        OwnerService.getAll()
      ])
      setPatients(patientsData)
      setOwners(ownersData)
    } catch (error) {
      toast.error('Error al cargar datos')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (e) => {
    const query = e.target.value
    setSearchQuery(query)
    
    if (query.length >= 2) {
      try {
        const data = await PatientService.search(query)
        setPatients(data)
      } catch (error) {
        console.error('Search error:', error)
      }
    } else if (query.length === 0) {
      loadData()
    }
  }

  const openModal = (patient = null) => {
    if (patient) {
      setEditingPatient(patient)
      setFormData({
        name: patient.name,
        species: patient.species,
        breed: patient.breed || '',
        gender: patient.gender || 'UNKNOWN',
        birthDate: patient.birthDate || '',
        weight: patient.weight?.toString() || '',
        color: patient.color || '',
        medicalNotes: patient.medicalNotes || '',
        microchipNumber: patient.microchipNumber || '',
        ownerId: patient.ownerId.toString()
      })
    } else {
      setEditingPatient(null)
      setFormData({
        name: '',
        species: '',
        breed: '',
        gender: 'UNKNOWN',
        birthDate: '',
        weight: '',
        color: '',
        medicalNotes: '',
        microchipNumber: '',
        ownerId: owners.length > 0 ? owners[0].id.toString() : ''
      })
    }
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setEditingPatient(null)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const payload = {
        ...formData,
        ownerId: parseInt(formData.ownerId),
        weight: formData.weight ? parseFloat(formData.weight) : null,
        birthDate: formData.birthDate || null
      }

      if (editingPatient) {
        await PatientService.update(editingPatient.id, payload)
        toast.success('Paciente actualizado correctamente')
      } else {
        await PatientService.create(payload)
        toast.success('Paciente creado correctamente')
      }
      closeModal()
      loadData()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al guardar')
    }
  }

  const handleDelete = async (patient) => {
    if (!confirm(`¿Estás seguro de eliminar a ${patient.name}?`)) {
      return
    }
    try {
      await PatientService.delete(patient.id)
      toast.success('Paciente eliminado correctamente')
      loadData()
    } catch (error) {
      toast.error('Error al eliminar')
    }
  }

  const getGenderLabel = (gender) => {
    const labels = { MALE: 'Macho', FEMALE: 'Hembra', UNKNOWN: 'Desconocido' }
    return labels[gender] || gender
  }

  const getSpeciesIcon = (species) => {
    const lower = species.toLowerCase()
    if (lower.includes('perro') || lower.includes('dog')) return '🐕'
    if (lower.includes('gato') || lower.includes('cat')) return '🐈'
    if (lower.includes('ave') || lower.includes('bird')) return '🐦'
    if (lower.includes('conejo') || lower.includes('rabbit')) return '🐰'
    return '🐾'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-vetivet-red"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-800">Pacientes (Mascotas)</h1>
          <p className="text-gray-600">Gestiona los pacientes registrados</p>
        </div>
        <button onClick={() => openModal()} className="btn btn-primary">
          <Plus className="w-5 h-5" />
          Nuevo Paciente
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Buscar por nombre, especie o raza..."
            className="input pl-12"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr className="text-left text-sm text-gray-500">
                <th className="px-6 py-4 font-medium">Mascota</th>
                <th className="px-6 py-4 font-medium">Especie/Raza</th>
                <th className="px-6 py-4 font-medium">Dueño</th>
                <th className="px-6 py-4 font-medium">Género</th>
                <th className="px-6 py-4 font-medium">Peso</th>
                <th className="px-6 py-4 font-medium text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {patients.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    <PawPrint className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>No hay pacientes registrados</p>
                  </td>
                </tr>
              ) : (
                patients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-vetivet-blue-light rounded-full flex items-center justify-center text-lg">
                          {getSpeciesIcon(patient.species)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{patient.name}</p>
                          {patient.color && (
                            <p className="text-sm text-gray-500">Color: {patient.color}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-800">{patient.species}</p>
                      {patient.breed && (
                        <p className="text-sm text-gray-500">{patient.breed}</p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-800">{patient.ownerName}</p>
                      <p className="text-sm text-gray-500">{patient.ownerPhone}</p>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{getGenderLabel(patient.gender)}</td>
                    <td className="px-6 py-4 text-gray-600">
                      {patient.weight ? `${patient.weight} kg` : '-'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openModal(patient)}
                          className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(patient)}
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
                {editingPatient ? 'Editar Paciente' : 'Nuevo Paciente'}
              </h2>
              <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre de la Mascota *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dueño *
                </label>
                <select
                  name="ownerId"
                  value={formData.ownerId}
                  onChange={handleChange}
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Especie *
                  </label>
                  <input
                    type="text"
                    name="species"
                    value={formData.species}
                    onChange={handleChange}
                    placeholder="Perro, Gato, etc."
                    className="input"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Raza
                  </label>
                  <input
                    type="text"
                    name="breed"
                    value={formData.breed}
                    onChange={handleChange}
                    className="input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Género
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="input"
                  >
                    <option value="UNKNOWN">Desconocido</option>
                    <option value="MALE">Macho</option>
                    <option value="FEMALE">Hembra</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fecha de Nacimiento
                  </label>
                  <input
                    type="date"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                    className="input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Peso (kg)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    className="input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Color
                  </label>
                  <input
                    type="text"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    className="input"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Número de Microchip
                </label>
                <input
                  type="text"
                  name="microchipNumber"
                  value={formData.microchipNumber}
                  onChange={handleChange}
                  className="input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notas Médicas
                </label>
                <textarea
                  name="medicalNotes"
                  value={formData.medicalNotes}
                  onChange={handleChange}
                  rows={3}
                  className="input resize-none"
                ></textarea>
              </div>

              <div className="flex gap-3 pt-4">
                <button type="button" onClick={closeModal} className="btn btn-secondary flex-1">
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary flex-1">
                  {editingPatient ? 'Actualizar' : 'Crear'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
