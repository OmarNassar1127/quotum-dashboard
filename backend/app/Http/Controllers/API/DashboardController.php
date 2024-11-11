<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\User;
use App\Models\Coin;
use Carbon\Carbon;

class DashboardController extends Controller
{
    /**
     * Get dashboard statistics
     */
    public function getStats()
    {
        $stats = [
            'total_users' => User::count(),
            'total_coins' => Coin::count(),
            'total_posts' => Post::count(),
            'active_users' => User::where('is_active', true)->count(),
        ];

        return response()->json($stats);
    }

    /**
     * Get recent activity
     */
    public function getRecentActivity()
    {
        $activity = Post::with('user', 'coin')
            ->latest()
            ->take(10)
            ->get()
            ->map(function ($post) {
                return [
                    'type' => 'post',
                    'user' => $post->user->name,
                    'action' => 'created a post',
                    'target' => $post->title,
                    'coin' => $post->coin->name,
                    'timestamp' => $post->created_at->diffForHumans(),
                ];
            });

        return response()->json($activity);
    }

    /**
     * Get recent content
     */
    public function getRecentContent()
    {
        $content = Post::with('coin')
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($post) {
                return [
                    'id' => $post->id,
                    'title' => $post->title,
                    'coin' => $post->coin->name,
                    'status' => $post->status,
                    'created_at' => $post->created_at->format('Y-m-d H:i:s'),
                ];
            });

        return response()->json($content);
    }

    /**
     * Get performance metrics
     */
    public function getPerformanceMetrics()
    {
        $thirtyDaysAgo = Carbon::now()->subDays(30);

        $metrics = [
            'posts_last_30_days' => Post::where('created_at', '>=', $thirtyDaysAgo)->count(),
            'active_coins' => Coin::where('updated_at', '>=', $thirtyDaysAgo)->count(),
            'user_engagement' => User::where('last_login_at', '>=', $thirtyDaysAgo)->count(),
            'trending_coins' => Coin::orderBy('view_count', 'desc')->take(5)->get(['name', 'symbol', 'view_count']),
        ];

        return response()->json($metrics);
    }
}
