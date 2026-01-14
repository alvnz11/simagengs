<?php

namespace Database\Seeders;

use App\Models\Feedback;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FeedbackSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Feedback::create([
            'id' => 1,
            'internship_id' => 1,
            'period_start' => '2026-01-01',
            'period_end' => '2026-01-08',
            'score' => 90,
            'comment' => 'Keep Going!'
        ]);
    }
}
