<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\RecyclingRecord;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ValidationController extends Controller
{
    public function approve($id)
    {
        try {
            $record = RecyclingRecord::findOrFail($id);
            
            // Verificar si el modelo Material existe y tiene la relación correcta
            if (!$record->material) {
                return redirect()->back()->with('error', 'No se encontró el material asociado');
            }
            
            // Actualizar el estado del registro
            $record->status = 'approved';
            
            // Calcular y asignar puntos (con manejo de errores)
            $pointsPerUnit = $record->material->points_per_unit ?? 2; // Valor predeterminado
            $points = $record->quantity * $pointsPerUnit;
            $record->points_earned = $points;
            
            $record->save();
            
            // Actualizar los puntos del usuario
            $user = $record->user;
            if ($user) {
                $user->points = ($user->points ?? 0) + $points;
                $user->save();
            }
            
            return redirect()->back()->with('success', 'Registro aprobado correctamente');
        } catch (\Exception $e) {
            // Registrar el error para depuración
            Log::error('Error al aprobar registro: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Error al procesar la solicitud: ' . $e->getMessage());
        }
    }
    
    public function reject($id)
    {
        try {
            $record = RecyclingRecord::findOrFail($id);
            
            $record->status = 'rejected';
            $record->save();
            
            return redirect()->back()->with('success', 'Registro rechazado correctamente');
        } catch (\Exception $e) {
            Log::error('Error al rechazar registro: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Error al procesar la solicitud: ' . $e->getMessage());
        }
    }
}