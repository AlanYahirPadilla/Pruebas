<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\RecyclingRecord;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // Obtener validaciones pendientes
        $pendingValidations = RecyclingRecord::with(['user', 'material'])
            ->where('status', 'pending')
            ->latest()
            ->take(10)
            ->get();
            
        // Estadísticas básicas
        $totalUsers = User::count();
        $totalMaterial = RecyclingRecord::where('status', 'approved')->sum('quantity');
        $totalPoints = User::sum('points');
        
        // Actividad reciente simplificada
        $recentActivity = RecyclingRecord::with(['user', 'material'])
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($record) {
                return [
                    'id' => $record->id,
                    'user' => $record->user->name,
                    'action' => 'Registro de reciclaje',
                    'material' => $record->material->name,
                    'quantity' => $record->quantity,
                    'date' => $record->created_at->format('Y-m-d'),
                    'status' => $record->status
                ];
            });
            
        // Distribución de materiales simplificada
        $materialDistribution = [];
        
        return Inertia::render('Admin/Dashboard', [
            'pendingValidations' => $pendingValidations,
            'stats' => [
                'users' => [
                    'total' => $totalUsers,
                    'increase' => 0
                ],
                'material' => [
                    'total' => $totalMaterial,
                    'increase' => 0
                ],
                'points' => [
                    'total' => $totalPoints,
                    'increase' => 0
                ]
            ],
            'recentActivity' => $recentActivity,
            'materialDistribution' => $materialDistribution
        ]);
    }
}