<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\ActivityLogController;
use App\Http\Controllers\Api\ProfileController;

Route::post('/login', [AuthController::class, 'login'])->middleware('throttle:login');

Route::middleware('auth:api', 'throttle:api')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    // activity logs
    Route::get('/activity-logs', [ActivityLogController::class, 'index']);

    // profile 
    Route::get('/profile', [ProfileController::class, 'show']);
    Route::put('/profile', [ProfileController::class, 'update']);
    Route::put('/change-password', [ProfileController::class, 'changePassword']);

    // admin
    Route::middleware('role:admin')->group(function () {
        Route::get('/admin-only', function() {
            return response()->json(['message' => 'Welcome, Admin!']);
        });
    });
});