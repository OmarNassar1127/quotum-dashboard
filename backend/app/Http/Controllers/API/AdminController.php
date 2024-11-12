<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Models\Post;
use App\Models\Coin;
use Illuminate\Http\Request;
use Carbon\Carbon;

class AdminController extends Controller
{
    /**
     * Get list of all users
     */
    public function users()
    {
        $users = User::withCount(['posts'])
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return UserResource::collection($users);
    }

    /**
     * Activate a user account
     */
    public function activateUser($id)
    {
        $user = User::findOrFail($id);
        $user->update(['is_active' => true]);

        return new UserResource($user);
    }

    /**
     * Deactivate a user account
     */
    public function deactivateUser($id)
    {
        $user = User::findOrFail($id);

        // Prevent deactivating your own account or other admin accounts
        if ($user->role === 'admin') {
            return response()->json([
                'message' => 'Cannot deactivate admin accounts'
            ], 403);
        }

        $user->update(['is_active' => false]);

        return new UserResource($user);
    }

    /**
     * Get user activity
     */
    public function getUserActivity($id)
    {
        $user = User::findOrFail($id);

        $activity = [
            'posts_count' => $user->posts()->count(),
            'last_login' => $user->last_login_at ? Carbon::parse($user->last_login_at)->diffForHumans() : null,
            'account_created' => $user->created_at->diffForHumans(),
            'recent_posts' => $user->posts()
                ->with('coin')
                ->latest()
                ->take(5)
                ->get()
                ->map(function ($post) {
                    return [
                        'id' => $post->id,
                        'title' => $post->title,
                        'coin' => $post->coin->name,
                        'created_at' => $post->created_at->format('Y-m-d H:i:s'),
                    ];
                }),
        ];

        return response()->json($activity);
    }

    /**
     * Get admin dashboard statistics
     */
    public function getStats()
    {
        $stats = [
            'total_users' => User::count(),
            'active_users' => User::where('is_active', true)->count(),
            'pending_users' => User::where('is_active', false)->count(),
            'total_posts' => Post::count(),
            'total_coins' => Coin::count(),
            'posts_this_month' => Post::whereMonth('created_at', Carbon::now()->month)->count(),
            'users_this_month' => User::whereMonth('created_at', Carbon::now()->month)->count(),
        ];

        return response()->json($stats);
    }

    /**
     * Get recent system activity
     */
    public function getRecentActivity()
    {
        $posts = Post::with(['user', 'coin'])
            ->latest()
            ->take(10)
            ->get()
            ->map(function ($post) {
                return [
                    'type' => 'post',
                    'user' => $post->user->name,
                    'action' => 'created post',
                    'target' => $post->title,
                    'coin' => $post->coin->name,
                    'timestamp' => $post->created_at->diffForHumans(),
                ];
            });

        $users = User::latest()
            ->take(10)
            ->get()
            ->map(function ($user) {
                return [
                    'type' => 'user',
                    'user' => $user->name,
                    'action' => 'registered',
                    'target' => $user->email,
                    'timestamp' => $user->created_at->diffForHumans(),
                ];
            });

        $activity = $posts->concat($users)
            ->sortByDesc('timestamp')
            ->values()
            ->take(10);

        return response()->json($activity);
    }
}
