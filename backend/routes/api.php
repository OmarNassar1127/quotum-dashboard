<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CoinController;
use App\Http\Controllers\API\PostController;
use App\Http\Controllers\API\DashboardController;
use App\Http\Controllers\API\AdminController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Public routes
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/register', [AuthController::class, 'register']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // Auth routes
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/user', [AuthController::class, 'user']);

    // Dashboard routes
    Route::prefix('dashboard')->group(function () {
        Route::get('/stats', [DashboardController::class, 'getStats']);
        Route::get('/recent-activity', [DashboardController::class, 'getRecentActivity']);
        Route::get('/recent-content', [DashboardController::class, 'getRecentContent']);
        Route::get('/performance', [DashboardController::class, 'getPerformanceMetrics']);
    });

    // Coin routes (public access)
    Route::get('/coins', [CoinController::class, 'index']);
    Route::get('/coins/{id}', [CoinController::class, 'show']);
    Route::get('/coins/{id}/posts', [CoinController::class, 'getPosts']);

    // Post routes (public access)
    Route::get('/posts', [PostController::class, 'index']);
    Route::get('/posts/recent', [PostController::class, 'recent']);
    Route::get('/posts/{id}', [PostController::class, 'show']);

    // Admin routes (requires admin role)
    Route::middleware('role:admin')->prefix('admin')->group(function () {
        // User management
        Route::get('/users', [AdminController::class, 'users']);
        Route::post('/users/{id}/activate', [AdminController::class, 'activateUser']);
        Route::post('/users/{id}/deactivate', [AdminController::class, 'deactivateUser']);
        Route::get('/users/{id}/activity', [AdminController::class, 'getUserActivity']);

        // Coin management
        Route::post('/coins', [CoinController::class, 'store']);
        Route::put('/coins/{id}', [CoinController::class, 'update']);
        Route::delete('/coins/{id}', [CoinController::class, 'destroy']);
        Route::post('/coins/update-prices', [CoinController::class, 'updatePrices']);
        Route::post('/coins/sync-coingecko', [CoinController::class, 'syncWithCoingecko']);

        // Post management
        Route::post('/posts', [PostController::class, 'store']);
        Route::put('/posts/{id}', [PostController::class, 'update']);
        Route::delete('/posts/{id}', [PostController::class, 'destroy']);
        Route::post('/posts/{id}/publish', [PostController::class, 'publish']);
        Route::post('/posts/{id}/unpublish', [PostController::class, 'unpublish']);
    });
});
