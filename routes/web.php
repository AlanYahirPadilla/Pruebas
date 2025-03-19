<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MaterialController;
use App\Http\Controllers\RecyclingRecordController;
use App\Http\Controllers\RewardController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;

use App\Http\Controllers\Admin\ValidationController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

// Asegúrate de que estas rutas estén dentro del grupo de middleware auth y admin
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');
    
    // Rutas de validación
    Route::post('/validations/{id}/approve', [ValidationController::class, 'approve'])
        ->name('validations.approve');
    Route::post('/validations/{id}/reject', [ValidationController::class, 'reject'])
        ->name('validations.reject');
});
// Rutas protegidas por autenticación
Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard del usuario
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Perfil
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    // Materiales
    Route::get('/materials', [MaterialController::class, 'index'])->name('materials.index');
    
    // Registros de reciclaje
    Route::get('/recycling-records', [RecyclingRecordController::class, 'index'])->name('recycling-records.index');
    Route::post('/recycling-records', [RecyclingRecordController::class, 'store'])->name('recycling-records.store');
    Route::get('/recycle', function () {
        return Inertia::render('Recycle');
    })->name('recycle');
    
    // Recompensas
    Route::get('/rewards', function () {
        return Inertia::render('Rewards');
    })->name('rewards');
    Route::get('/rewards/list', [RewardController::class, 'index'])->name('rewards.list');
    Route::post('/rewards/{reward}/redeem', [RewardController::class, 'redeem'])->name('rewards.redeem');
    
    // Rutas para administradores
    Route::middleware(['can:viewAdminDashboard,App\Models\User'])->prefix('admin')->group(function () {
        // Dashboard de administrador
        Route::get('/dashboard', [DashboardController::class, 'adminDashboard'])->name('admin.dashboard');
        
        // Gestión de usuarios
        Route::get('/users', function () {
            return Inertia::render('Admin/Users/Index');
        })->name('admin.users');
        
        // Validaciones de reciclaje
        Route::get('/validations', function () {
            return Inertia::render('Admin/Validations/Index');
        })->name('admin.validations');
        Route::get('/validations/pending', [RecyclingRecordController::class, 'pendingValidations'])->name('admin.validations.pending');
        Route::post('/validations/{record}/approve', [RecyclingRecordController::class, 'approve'])->name('admin.validations.approve');
        Route::post('/validations/{record}/reject', [RecyclingRecordController::class, 'reject'])->name('admin.validations.reject');
        
        // Gestión de materiales
        Route::get('/materials', [MaterialController::class, 'adminIndex'])->name('admin.materials');
        Route::post('/materials', [MaterialController::class, 'store'])->name('admin.materials.store');
        Route::put('/materials/{material}', [MaterialController::class, 'update'])->name('admin.materials.update');
        Route::delete('/materials/{material}', [MaterialController::class, 'destroy'])->name('admin.materials.destroy');
        
        // Gestión de recompensas
        Route::get('/rewards', [RewardController::class, 'adminIndex'])->name('admin.rewards');
        Route::post('/rewards', [RewardController::class, 'store'])->name('admin.rewards.store');
        Route::put('/rewards/{reward}', [RewardController::class, 'update'])->name('admin.rewards.update');
        Route::delete('/rewards/{reward}', [RewardController::class, 'destroy'])->name('admin.rewards.destroy');
        
        // Reportes
        Route::get('/reports', function () {
            return Inertia::render('Admin/Reports/Index');
        })->name('admin.reports');
    });
});

require __DIR__.'/auth.php';