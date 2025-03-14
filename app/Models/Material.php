<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Material extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'points_per_unit',
        'active'
    ];

    public function recyclingRecords()
    {
        return $this->hasMany(RecyclingRecord::class);
    }
}