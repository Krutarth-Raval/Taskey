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

}
