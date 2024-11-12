<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\DashboardController;
use App\Http\Controllers\API\AdminController;
use App\Http\Controllers\API\PostController;
use App\Http\Controllers\API\CoinController;
use App\Http\Controllers\API\AuthController;

/*
|--------------------------------------------------------------------------
| Dashboard Routes
|--------------------------------------------------------------------------
|
| Here is where you can register dashboard routes for your application.
| These routes are loaded by the RouteServiceProvider within a group which
| contains the "api" middleware group.
|
*/

// Public Routes
Route::prefix('api/dashboard')->group(function () {
    // Authentication Routes
    Route::post('/auth/register', [AuthController::class, 'register']);
    Route::post('/auth/login', [AuthController::class, 'login']);
});

// Protected Routes
Route::middleware(['auth:sanctum'])->prefix('api/dashboard')->group(function () {
    // Dashboard Routes
    Route::prefix('stats')->group(function () {
        Route::get('/', [DashboardController::class, 'getStats']);
        Route::get('/recent-content', [DashboardController::class, 'getRecentContent']);
        Route::get('/recent-activity', [DashboardController::class, 'getRecentActivity']);
    });

    // Content Management Routes
    Route::prefix('content')->group(function () {
        Route::get('/posts', [PostController::class, 'index']);
        Route::post('/posts', [PostController::class, 'store']);
        Route::get('/posts/{post}', [PostController::class, 'show']);
        Route::put('/posts/{post}', [PostController::class, 'update']);
        Route::delete('/posts/{post}', [PostController::class, 'destroy']);
    });

    // Coin Routes
    Route::prefix('coins')->group(function () {
        Route::get('/', [CoinController::class, 'index']);
        Route::get('/{coin}', [CoinController::class, 'show']);
        Route::get('/{coin}/posts', [CoinController::class, 'getPosts']);
        Route::post('/{coin}/posts', [CoinController::class, 'createPost']);
    });

    // Admin Routes
    Route::middleware(['role:admin'])->prefix('admin')->group(function () {
        // User Management
        Route::get('/users', [AdminController::class, 'getUsers']);
        Route::post('/users/{user}/activate', [AdminController::class, 'activateUser']);
        Route::post('/users/{user}/deactivate', [AdminController::class, 'deactivateUser']);

        // Activity Logs
        Route::get('/activity', [AdminController::class, 'getActivityLog']);

        // Content Management
        Route::post('/coins', [AdminController::class, 'createCoin']);
        Route::put('/coins/{coin}', [AdminController::class, 'updateCoin']);
        Route::delete('/coins/{coin}', [AdminController::class, 'deleteCoin']);

        // System Settings
        Route::get('/settings', [AdminController::class, 'getSettings']);
        Route::put('/settings', [AdminController::class, 'updateSettings']);
    });
});

// Background Job Routes (Protected with admin middleware)
Route::middleware(['auth:sanctum', 'role:admin'])->prefix('api/dashboard/jobs')->group(function () {
    Route::post('/update-coin-prices', [CoinController::class, 'triggerPriceUpdate']);
    Route::get('/status', [CoinController::class, 'getJobStatus']);
});
