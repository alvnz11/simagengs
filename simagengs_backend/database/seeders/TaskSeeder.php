<?php

namespace Database\Seeders;

use App\Models\Task;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Task::create([
            'internship_id' => 1,
            'title' => 'First Task',
            'description' => 'Make a CRUD for this system',
            'status' => 'Process',
            'due_date' => '2026-01-07',
        ]);
    }
}
