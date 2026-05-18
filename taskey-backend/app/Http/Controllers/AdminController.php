<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function getUsers()
    {
        $users = User::select(
            'id',
            'name',
            'email',
            'created_at',
            'role'
        )->withCount('tasks')->withCount([
                    'tasks as completed_tasks_count' => function ($query) {
                        $query->where('status', 'completed');

                    }
                ])->get();

        return response()->json([
            "users" => $users
        ]);
    }

    public function deleteUser($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                "message" => "User not found"
            ], 404);
        }

        // Prevent deleting admin users (including self or other admins)
        if ($user->role === 'admin') {
            return response()->json([
                "message" => "You cannot delete an admin user"
            ], 403);
        }

        $user->delete();

        return response()->json([
            "message" => "User deleted successfully"
        ]);
    }
}
