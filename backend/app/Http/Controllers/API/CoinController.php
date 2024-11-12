<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\CoinResource;
use App\Models\Coin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class CoinController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $coins = Coin::with('posts')->get();
        return CoinResource::collection($coins);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'symbol' => 'required|string|max:10',
            'coingecko_id' => 'required|string|unique:coins',
            'image_url' => 'required|url',
        ]);

        $coin = Coin::create($request->all());

        // Fetch initial price data from CoinGecko
        $response = Http::get("https://api.coingecko.com/api/v3/simple/price", [
            'ids' => $coin->coingecko_id,
            'vs_currencies' => 'usd',
            'include_24hr_change' => true,
        ]);

        if ($response->successful()) {
            $data = $response->json();
            $coin->update([
                'current_price' => $data[$coin->coingecko_id]['usd'],
                'price_change_percentage_24h' => $data[$coin->coingecko_id]['usd_24h_change'] ?? 0,
            ]);
        }

        return new CoinResource($coin);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $coin = Coin::with('posts')->findOrFail($id);
        return new CoinResource($coin);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'string|max:255',
            'symbol' => 'string|max:10',
            'coingecko_id' => 'string|unique:coins,coingecko_id,' . $id,
            'image_url' => 'url',
        ]);

        $coin = Coin::findOrFail($id);
        $coin->update($request->all());

        return new CoinResource($coin);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $coin = Coin::findOrFail($id);
        $coin->delete();

        return response()->json(['message' => 'Coin deleted successfully']);
    }

    /**
     * Update prices for all coins from CoinGecko.
     */
    public function updatePrices()
    {
        $coins = Coin::all();
        $coinIds = $coins->pluck('coingecko_id')->join(',');

        $response = Http::get("https://api.coingecko.com/api/v3/simple/price", [
            'ids' => $coinIds,
            'vs_currencies' => 'usd',
            'include_24hr_change' => true,
        ]);

        if ($response->successful()) {
            $data = $response->json();
            foreach ($coins as $coin) {
                if (isset($data[$coin->coingecko_id])) {
                    $coin->update([
                        'current_price' => $data[$coin->coingecko_id]['usd'],
                        'price_change_percentage_24h' => $data[$coin->coingecko_id]['usd_24h_change'] ?? 0,
                    ]);
                }
            }
            return response()->json(['message' => 'Prices updated successfully']);
        }

        return response()->json(['message' => 'Failed to update prices'], 500);
    }
}
