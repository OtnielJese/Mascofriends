import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Users, PawPrint, Calendar, TrendingUp, Clock, CheckCircle } from 'lucide-react'
import { OwnerService, PatientService, AppointmentService } from '../../services/dataService'

export default function Dashboard() {
  const [stats, setStats] = useState({
    owners: 0,
    patients: 0,
    pendingAppointments: 0,
    completedAppointments: 0
  })
  const [recentAppointments, setRecentAppointments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      const [owners, patients, appointments] = await Promise.all([
        OwnerService.getAll(),
        PatientService.getAll(),
        AppointmentService.getAll()
      ])

      const pending = appointments.filter(a => a.status === 'PENDING').length
      const completed = appointments.filter(a => a.status === 'COMPLETED').length

      setStats({
        owners: owners.length,
        patients: patients.length,
        pendingAppointments: pending,
        completedAppointments: completed
      })

      // Get recent appointments (last 5)
      const sorted = [...appointments].sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      ).slice(0, 5)
      setRecentAppointments(sorted)
    } catch (error) {
      console.error('Error loading stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      label: 'Dueños Registrados',
      value: stats.owners,
      icon: Users,
      color: 'bg-blue-500',
      link: '/admin/owners'
    },
    {
      label: 'Pacientes (Mascotas)',
      value: stats.patients,
      icon: PawPrint,
      color: 'bg-green-500',
      link: '/admin/patients'
    },
    {
      label: 'Citas Pendientes',
      value: stats.pendingAppointments,
      icon: Clock,
      color: 'bg-orange-500',
      link: '/admin/appointments'
    },
    {
      label: 'Citas Completadas',
      value: stats.completedAppointments,
      icon: CheckCircle,
      color: 'bg-purple-500',
      link: '/admin/appointments'
    },
  ]

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
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status] || 'bg-gray-100'}`}>
        {labels[status] || status}
      </span>
    )
  }

  const getTypeBadge = (type) => {
    const labels = {
      CONSULTATION: 'Consulta',
      BATH_AND_GROOMING: 'Baño/Corte',
      SURGERY: 'Cirugía',
      VACCINATION: 'Vacunación',
      CHECKUP: 'Chequeo'
    }
    return labels[type] || type
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
      <div>
        <h1 className="text-2xl font-display font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Bienvenido al panel de administración de Vetivet</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Link
            key={index}
            to={stat.link}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Appointments */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Citas Recientes</h2>
          <Link 
            to="/admin/appointments"
            className="text-vetivet-red hover:text-vetivet-red/80 text-sm font-medium"
          >
            Ver todas →
          </Link>
        </div>

        {recentAppointments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No hay citas registradas</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 border-b">
                  <th className="pb-3 font-medium">Mascota</th>
                  <th className="pb-3 font-medium">Dueño</th>
                  <th className="pb-3 font-medium">Tipo</th>
                  <th className="pb-3 font-medium">Fecha</th>
                  <th className="pb-3 font-medium">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {recentAppointments.map((apt) => (
                  <tr key={apt.id} className="text-sm">
                    <td className="py-3 font-medium text-gray-800">{apt.patientName}</td>
                    <td className="py-3 text-gray-600">{apt.ownerName}</td>
                    <td className="py-3 text-gray-600">{getTypeBadge(apt.type)}</td>
                    <td className="py-3 text-gray-600">
                      {new Date(apt.appointmentDate).toLocaleDateString('es-PE', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td className="py-3">{getStatusBadge(apt.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/admin/owners"
          className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 hover:shadow-lg transition-shadow"
        >
          <Users className="w-8 h-8 mb-3" />
          <h3 className="text-lg font-semibold mb-1">Gestionar Dueños</h3>
          <p className="text-blue-100 text-sm">Agregar, editar o eliminar dueños de mascotas</p>
        </Link>

        <Link
          to="/admin/patients"
          className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6 hover:shadow-lg transition-shadow"
        >
          <PawPrint className="w-8 h-8 mb-3" />
          <h3 className="text-lg font-semibold mb-1">Gestionar Pacientes</h3>
          <p className="text-green-100 text-sm">Administrar expedientes de mascotas</p>
        </Link>

        <Link
          to="/admin/appointments"
          className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl p-6 hover:shadow-lg transition-shadow"
        >
          <Calendar className="w-8 h-8 mb-3" />
          <h3 className="text-lg font-semibold mb-1">Ver Citas</h3>
          <p className="text-orange-100 text-sm">Gestionar citas y consultas</p>
        </Link>
      </div>
    </div>
  )
}
