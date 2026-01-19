<?php

namespace App\Http\Controllers\Api;

use App\Models\Task;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class TaskController extends Controller
{
    public function myTasks(Request $request) {
        $internship = $request->user()->internshipsAsIntern()->first();

        $internshipId = $internship ? $internship->id : null;

        return response()->json([
            'message' => 'Tasks retrieved successfully',
            'data' => Task::where('internship_id', $internshipId)->get()
        ]);
    }
}
