<?php

namespace App\Http\Controllers;

use App\Models\RecyclingRecord;
use App\Models\Reward;
use App\Models\RewardRedemption;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        if (Auth::user()->role === 'admin') {
            return redirect()->route('admin.dashboard');
        }

        $user = Auth::user();
        
        // Obtener historial de reciclaje
        $recyclingHistory = $user->recycling_records()
            ->with('material')
            ->orderBy('created_at', 'desc')
            ->take(10)
            ->get();
            
        // Obtener estadísticas de materiales reciclados
        $materialStats = RecyclingRecord::with('material')
            ->where('user_id', $user->id)
            ->where('status', 'approved')
            ->get()
            ->groupBy('material.name')
            ->map(function ($group) {
                return [
                    'quantity' => $group->sum('quantity'),
                    'points' => $group->sum('points_earned')
                ];
            });
            
        // Obtener recompensas disponibles
        $availableRewards = Reward::where('active', true)
            ->where('points_cost', '<=', $user->points)
            ->take(3)
            ->get();
            
        return Inertia::render('Dashboard', [
            'recyclingHistory' => $recyclingHistory,
            'materialStats' => $materialStats,
            'availableRewards' => $availableRewards,
            'userPoints' => $user->points
        ]);
    }

    public function adminDashboard()
    {
        // Verificar si el usuario tiene permisos de administrador
        if (!Auth::user() || Auth::user()->role !== 'admin') {
            abort(403, 'No tienes permiso para acceder a esta página');
        }
        
        // Estadísticas generales
        $totalUsers = User::count();
        $totalMaterialRecycled = RecyclingRecord::where('status', 'approved')->sum('quantity');
        $totalPointsRedeemed = RewardRedemption::sum('points_spent');
        
        // Validaciones pendientes
        $pendingValidations = RecyclingRecord::with(['user', 'material'])
            ->where('status', 'pending')
            ->orderBy('created_at', 'desc')
            ->take(10)
            ->get();
            
        // Distribución de materiales
        $materialDistribution = RecyclingRecord::where('status', 'approved')
            ->join('materials', 'recycling_records.material_id', '=', 'materials.id')
            ->selectRaw('materials.name, SUM(recycling_records.quantity) as total')
            ->groupBy('materials.name')
            ->get();
            
        $totalMaterialCount = $materialDistribution->sum('total');
        
        $materialDistribution = $materialDistribution->map(function ($item) use ($totalMaterialCount) {
            return [
                'name' => $item->name,
                'total' => $item->total,
                'percentage' => $totalMaterialCount > 0 ? round(($item->total / $totalMaterialCount) * 100, 1) : 0
            ];
        });
            
        // Actividad reciente
        $recentActivity = RecyclingRecord::with(['user', 'material'])
            ->orderBy('created_at', 'desc')
            ->take(10)
            ->get()
            ->map(function ($record) {
                return [
                    'id' => $record->id,
                    'user' => $record->user->name,
                    'action' => 'Registro de reciclaje',
                    'details' => $record->material->name . ' (' . $record->quantity . ')',
                    'date' => $record->created_at->format('Y-m-d'),
                    'status' => $record->status
                ];
            });
            
        return Inertia::render('Admin/Dashboard', [
            'totalUsers' => $totalUsers,
            'totalMaterialRecycled' => $totalMaterialRecycled,
            'totalPointsRedeemed' => $totalPointsRedeemed,
            'pendingValidations' => $pendingValidations,
            'materialDistribution' => $materialDistribution,
            'recentActivity' => $recentActivity
        ]);
    }
}