<?php

namespace Database\Seeders;

use App\Models\Meeting;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MeetingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Meeting::create([
            'internship_id' => 1,
            'meeting_date' => '2026-01-05',
            'topic' => 'Production System',
            'notes' => 'The color of the system must blue!!'
        ]);
    }
}
