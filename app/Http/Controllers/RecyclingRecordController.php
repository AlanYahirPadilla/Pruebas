<?php

namespace App\Http\Controllers;

use App\Models\RecyclingRecord;
use App\Models\Material;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; // Añadir esta importación
use Illuminate\Support\Str;
use Inertia\Inertia;

class RecyclingRecordController extends Controller
{
    public function index()
    {
        $records = RecyclingRecord::with('material')
            ->where('user_id', Auth::id()) // Usar Auth::id() en lugar de auth()->id()
            ->orderBy('created_at', 'desc')
            ->get();
            
        return response()->json($records);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'material_id' => 'required|exists:materials,id',
            'quantity' => 'required|integer|min:1|max:50',
            'location' => 'required|string|max:255',
            'comments' => 'nullable|string'
        ]);

        $material = Material::findOrFail($validated['material_id']);
        
        // Generar número de ticket único
        $ticketNumber = 'ECO-' . strtoupper(Str::random(8));
        
        $record = RecyclingRecord::create([
            'user_id' => Auth::id(), // Usar Auth::id() en lugar de auth()->id()
            'material_id' => $validated['material_id'],
            'quantity' => $validated['quantity'],
            'location' => $validated['location'],
            'comments' => $validated['comments'],
            'status' => 'pending',
            'ticket_number' => $ticketNumber
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Registro creado correctamente',
            'ticket_number' => $ticketNumber,
            'estimated_points' => $material->points_per_unit * $validated['quantity']
        ]);
    }

    public function pendingValidations()
    {
        // Verificar si el usuario tiene permisos para ver validaciones pendientes
        if (!Auth::user() || !in_array(Auth::user()->role, ['admin', 'recycling_manager'])) {
            abort(403, 'No tienes permiso para acceder a esta información');
        }
        
        $pendingRecords = RecyclingRecord::with(['user', 'material'])
            ->where('status', 'pending')
            ->orderBy('created_at', 'desc')
            ->get();
            
        return response()->json($pendingRecords);
    }

    public function approve(RecyclingRecord $record)
    {
        // Verificar si el usuario tiene permisos para aprobar registros
        if (!Auth::user() || !in_array(Auth::user()->role, ['admin', 'recycling_manager'])) {
            abort(403, 'No tienes permiso para realizar esta acción');
        }
        
        $material = $record->material;
        $pointsEarned = $material->points_per_unit * $record->quantity;
        
        $record->update([
            'status' => 'approved',
            'points_earned' => $pointsEarned
        ]);
        
        // Actualizar puntos del usuario
        $user = $record->user;
        $user->points += $pointsEarned;
        $user->save();
        
        return response()->json([
            'success' => true,
            'message' => 'Registro aprobado correctamente'
        ]);
    }

    public function reject(RecyclingRecord $record)
    {
        // Verificar si el usuario tiene permisos para rechazar registros
        if (!Auth::user() || !in_array(Auth::user()->role, ['admin', 'recycling_manager'])) {
            abort(403, 'No tienes permiso para realizar esta acción');
        }
        
        $record->update([
            'status' => 'rejected',
            'points_earned' => 0
        ]);
        
        return response()->json([
            'success' => true,
            'message' => 'Registro rechazado correctamente'
        ]);
    }
}