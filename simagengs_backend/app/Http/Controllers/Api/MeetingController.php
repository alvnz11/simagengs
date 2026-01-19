<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Meeting;
use Illuminate\Http\Request;

class MeetingController extends Controller
{
    public function index(Request $request) {
        $internship = $request->user()->internshipsAsIntern()->first();
        $internshipId = $internship ? $internship->id : null;

        $data = Meeting::where('internship_id', $internshipId)
            ->with('internship')
            ->paginate(10);

        return response()->json($data);
    }

    public function store(Request $request) {
        $internship = $request->user()->internshipsAsIntern()->first();
        $internshipId = $internship ? $internship->id : null;

        $request->validate([
            'meeting_date' => 'required|date',
            'topic' => 'required|string',
            'notes' => 'required|string'
        ]);

        $data = Meeting::create([
            'internship_id' => 3,
            'meeting_date' => $request->meeting_date,
            'topic' => $request->topic,
            'notes' => $request->notes
        ]);

        return response()->json([
            'message' => 'Meeting created successfully',
            'data' => $data
        ], 201);
    }

    public function update(Request $request, $id) {
        $meeting = Meeting::findOrFail($id);

        $data = $request->validate([
            'meeting_date' => 'sometimes|date',
            'topic' => 'sometimes|string',
            'notes' => 'sometimes|string'
        ]);

        $meeting->update($data);
        $meeting->refresh();

        return response()->json([
            'message' => 'Meeting updated successfully',
            'data' => $meeting
        ]);
    }

    public function destroy($id) {
        $meeting = Meeting::findOrFail($id);
        $meeting->delete();

        return response()->json([
            'message' => 'Meeting deleted successfully'
        ]);
    }
}
