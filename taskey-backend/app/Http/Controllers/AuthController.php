<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\facades\Auth;
use Illuminate\Support\Facades\Password;

class AuthController extends Controller
{
    // register new user
    public function register(Request $request)
    {
        // Validate request data

        $validated = $request->validate([
            "name" => "required|string|min:3|max:15",
            "email" => "required|email|unique:users,email",
            "password" => "required|min:8|confirmed",
        ]);

        // Create a new user
        $user = User::create([
            "name" => $validated["name"],
            "email" => $validated["email"],
            "password" => Hash::make($validated["password"]),
        ]);

        // generate token
        $token = $user->createToken("auth_token")->plainTextToken;

        //Return Response 

        return response()->json([
            "message" => "User Registered Successfully.",
            "token" => $token,
            "user" => $user
        ], 201);
    }

    //login user
    public function login(Request $request)
    {
        //validate request data
        $validated = $request->validate([
            "email" => "required|email",
            "password" => "required"
        ]);

        //Attempt Login 
        if (!Auth::attempt($validated)) {
            return response()->json([
                "message" => "Invalid credential"
            ], 401);
        }

        //Get authenticated user
        $user = Auth::user();

        //Generate token
        $token = $user->createToken("auth_token")->plainTextToken;

        //return response
        return response()->json([
            "message" => "Logged in successfully",
            "token" => $token,
            "user" => $user
        ]);
    }

    //logout user
    public function logout(Request $request)
    {
        //Delete current token 
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            "message" => "Logged out successfully."
        ]);
    }

    //get user
    public function getUser(Request $request)
    {
        return response()->json([
            "user" => $request->user()
        ]);
    }

    //delete account
    public function deleteUser(Request $request)
    {
        $user = $request->user();
        $user->delete();

        return response()->json([
            "message" => "Account has been deleted successfully."
        ]);
    }

    //forget password

    public function forgotPassword(Request $request)
    {
        $request->validate([
            "email" => "required|email"
        ]);

        $status = Password::sendResetLink(
            $request->only("email")
        );

        if ($status === Password::RESET_LINK_SENT) {
            return response()->json([
                "message" => "Reset link sent successfully."
            ], 200);
        }

        return response()->json([
            "message" => "Failed to send reset link."
        ], 500);
    }

    //reset password
    public function resetPassword(Request $request)
    {
        $request->validate([
            "token" => "required",
            "email" => "required|email",
            "password" => "required|min:8|confirmed"
        ]);

        $status = Password::reset(
            $request->only(
                "email",
                "password",
                "password_confirmation",
                "token"
            ),
            function ($user, $password) {

                $user->password = Hash::make($password);

                $user->save();
            }
        );

        if ($status === Password::PASSWORD_RESET) {

            return response()->json([
                "message" => "Password reset successful."
            ], 200);
        }

        return response()->json([
            "message" => "Invalid token or email."
        ], 400);
    }
}
