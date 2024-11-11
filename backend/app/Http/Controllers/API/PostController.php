<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use App\Models\Post;
use App\Models\Coin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Post::with(['coin', 'user']);

        // Filter by coin if specified
        if ($request->has('coin_id')) {
            $query->where('coin_id', $request->coin_id);
        }

        // Order by latest
        $posts = $query->latest()->paginate(10);
        return PostResource::collection($posts);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'coin_id' => 'required|exists:coins,id',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        // Ensure user has permission to create posts
        if (Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $post = Post::create([
            'title' => $request->title,
            'content' => $request->content,
            'coin_id' => $request->coin_id,
            'user_id' => Auth::id(),
        ]);

        // Handle image uploads if any
        if ($request->hasFile('images')) {
            $imageUrls = [];
            foreach ($request->file('images') as $image) {
                $path = $image->store('post-images', 'public');
                $imageUrls[] = asset('storage/' . $path);
            }
            $post->update(['images' => $imageUrls]);
        }

        return new PostResource($post->load(['coin', 'user']));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $post = Post::with(['coin', 'user'])->findOrFail($id);
        return new PostResource($post);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $post = Post::findOrFail($id);

        // Check if user has permission to update
        if (Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'title' => 'string|max:255',
            'content' => 'string',
            'coin_id' => 'exists:coins,id',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        $post->update($request->only(['title', 'content', 'coin_id']));

        // Handle new image uploads
        if ($request->hasFile('images')) {
            $imageUrls = $post->images ?? [];
            foreach ($request->file('images') as $image) {
                $path = $image->store('post-images', 'public');
                $imageUrls[] = asset('storage/' . $path);
            }
            $post->update(['images' => $imageUrls]);
        }

        return new PostResource($post->load(['coin', 'user']));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $post = Post::findOrFail($id);

        // Check if user has permission to delete
        if (Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $post->delete();
        return response()->json(['message' => 'Post deleted successfully']);
    }

    /**
     * Get recent posts for dashboard.
     */
    public function recent()
    {
        $posts = Post::with(['coin', 'user'])
            ->latest()
            ->take(5)
            ->get();

        return PostResource::collection($posts);
    }
}
