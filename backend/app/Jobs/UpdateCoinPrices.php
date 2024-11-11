<?php
namespace App\Jobs;

use App\Models\Coin;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class UpdateCoinPrices implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function handle()
    {
        $coins = Coin::all();

        foreach ($coins as $coin) {
            try {
                $response = Http::get("https://api.coingecko.com/api/v3/simple/price", [
                    'ids' => $coin->coingecko_id,
                    'vs_currencies' => 'usd',
                    'include_24hr_change' => 'true'
                ]);

                if ($response->successful()) {
                    $data = $response->json();
                    $coinData = $data[$coin->coingecko_id];

                    $coin->update([
                        'current_price' => $coinData['usd'],
                        'price_change_percentage_24h' => $coinData['usd_24h_change'] ?? 0
                    ]);
                }

                sleep(1); // Rate limiting
            } catch (\Exception $e) {
                Log::error("Failed to update price for {$coin->name}: " . $e->getMessage());
            }
        }
    }
}
