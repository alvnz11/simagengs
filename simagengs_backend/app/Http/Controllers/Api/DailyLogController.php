<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DailyLog;
use Illuminate\Http\Request;

class DailyLogController extends Controller
{
    public function index(Request $request) {
        $internship = $request->user()->internshipsAsIntern()->first();
        $internshipId = $internship ? $internship->id : null;
        
        $data = DailyLog::where('internship_id', $internshipId)->with(['internship.dospem:id,name', 'supervisor:id,name'])
            ->paginate(10);

        return response()->json($data);
    }

    public function store(Request $request) {
        $internship = $request->user()->internshipsAsIntern()->first();
        $internshipId = $internship ? $internship->id : null;

        $request->validate([
            'check_in_time' => 'required|date_format:H:i:s',
            'check_out_time' => 'required|date_format:H:i:s|after:check_in_time',
            'activity' => 'required|string'
        ]);

        $data = DailyLog::create([
                    'internship_id' => $internshipId,
                    'date' => now(),
                    'check_in_time' => $request->check_in_time,
                    'check_out_time' => $request->check_out_time,
                    'activity' => $request->activity,
                    'status' => 'Draft'
                ]);

        return response()->json([
            'message' => 'Daily log created successfully',
            'data' => $data
        ], 201);   
    }

    public function update(Request $request, $id) {
        $dailyLog = DailyLog::findOrFail($id);

        $data = $request->validate([
            'date' => 'sometimes|date',
            'check_in_time' => 'sometimes|date_format:H:i:s',
            'check_out_time' => 'sometimes|date_format:H:i:s|after:check_in_time',
            'activity' => 'sometimes|string'
        ]);

        $dailyLog->update($data);
        $dailyLog->refresh();

        return response()->json([
            'message' => 'Daily log updated',
            'data' => $dailyLog
        ]);
    }
}
