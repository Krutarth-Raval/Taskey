<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;


//Task Routes

Route::middleware(['auth:sanctum'])->group(function () {

    Route::post("/tasks", [TaskController::class, 'createTask']);

    Route::get("/tasks", [TaskController::class, "getTasks"]);

    Route::get("/tasks/{id}", [TaskController::class, "getTaskById"]);

    Route::patch("/tasks/{id}", [TaskController::class, "updateTask"]);

    Route::delete("/tasks/{id}", [TaskController::class, "deleteTask"]);

    Route::post("/logout", [AuthController::class, 'logout']);

    Route::get("/profile", [AuthController::class, "getUser"]);

    Route::delete("/delete-account", [AuthController::class, "deleteUser"]);

});

//Public routes
Route::post("/register", [AuthController::class, "register"]);

Route::post("/login", [AuthController::class, "login"]);

Route::post("/forgot-password", [AuthController::class, "forgotPassword"]);

Route::post("/reset-password", [AuthController::class, "resetPassword"]);
// Admin Routes
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::get('/admin/users', [AdminController::class, 'getUsers']);
    Route::delete('/admin/users/{id}', [AdminController::class, 'deleteUser']);
});

