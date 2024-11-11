<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Coin extends Model
{
    protected $fillable = [
        'name', 'symbol', 'coingecko_id', 'image_url',
        'current_price', 'price_change_percentage_24h'
    ];

    public function posts()
    {
        return $this->hasMany(Post::class);
    }
}
