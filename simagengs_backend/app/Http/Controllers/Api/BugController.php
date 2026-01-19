<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Bug;
use Illuminate\Http\Request;

use function Symfony\Component\Clock\now;

class BugController extends Controller
{
    public function index(Request $request) {
        $internship = $request->user()->internshipsAsIntern()->first();
        $internshipId = $internship ? $internship->id : null;
        $tiga = 3;

        $data = Bug::whereHas('daily_log', function($query) use ($internshipId) {
                $query->where('internship_id', $internshipId);
            })
            ->with('daily_log')
            ->paginate(10);

        return response()->json($data);
    }

    public function store(Request $request) {
        $request->validate([
            'daily_log_id' => 'required|exists:daily_logs,id',
            'title' => 'required|string',
            'description' => 'required|string'
        ]);

        $data = Bug::create([
            'daily_log_id' => $request->daily_log_id,
            'title' => $request->title,
            'description' => $request->description,
            'status' => 'New',
            'reported_at' => now()
        ]);

        return response()->json([
            'message' => 'Bug report created successfully',
            'data' => $data
        ], 201);
    }

    public function update(Request $request, $id) {
        
        $data = $request->validate([
            'title' => 'sometimes|string',
            'description' => 'sometimes|string',
            'status' => 'sometimes|in:New,Progress,Fixed,Rejected'
        ]);
            
        $bug = Bug::findOrFail($id);
        $bug->update($data);
        $bug->refresh();

        return response()->json([
            'message' => 'Bug report updated successfully',
            'data' => $request->all()
        ]);
    }

    public function destroy($id) {
        $bug = Bug::findOrFail($id);
        $bug->delete();

        return response()->json([
            'message' => 'Bug report deleted successfully',
        ]);
    }
}
