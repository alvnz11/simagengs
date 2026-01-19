<?php

use App\Models\DailyLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\BugController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\TaskController;
use App\Http\Controllers\Api\MeetingController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\DailyLogController;
use App\Http\Controllers\Api\InternshipController;
use App\Http\Controllers\Api\ActivityLogController;

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

    // internship
    Route::get('/internships', [InternshipController::class, 'index']);
    Route::get('/internships/{id}', [InternshipController::class, 'show']);

    // admin
    Route::middleware('role:admin')->group(function () {
        // internship management
        Route::post('/internships', [InternshipController::class, 'store']);
        Route::put('/internships/{id}', [InternshipController::class, 'update']);
        Route::delete('/internships/{id}', [InternshipController::class, 'destroy']);
    });

    // intern
    Route::middleware('role:intern')->group(function () {
        // internship management intern
        Route::get('/my-internship', [InternshipController::class, 'myInternship']);

        // task
        Route::get('/tasks', [TaskController::class, 'myTasks']);
        
        // daily logs
        Route::apiResource('/daily-logs', DailyLogController::class)
            ->only(['index', 'store', 'update']);

        // bug report
        Route::apiResource('/bugs', BugController::class)
            ->only(['index', 'store', 'update', 'destroy']);

        // // meetings
        Route::apiResource('/meetings', MeetingController::class)
            ->only(['index', 'store', 'update', 'destroy']);
    });
});