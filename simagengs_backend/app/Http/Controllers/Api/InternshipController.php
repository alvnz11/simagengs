<?php

namespace App\Http\Controllers\Api;

use App\Models\Internship;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class InternshipController extends Controller
{
    public function index() {
        $data = Internship::with(['intern', 'supervisor', 'dospem'])
            ->paginate(10);

        return response()->json($data);
    }

    public function show($id) {
        $internship = Internship::with(['intern', 'supervisor', 'dospem'])->findOrFail($id);

        return response()->json([
            'message' => 'Internship retrieved successfully',
            'data' => $internship
        ]);
    }

    public function store(Request $request) {
        $data = $request->validate([
            'intern_id' => 'required|exists:users,id',
            'supervisor_id' => 'required|exists:users,id',
            'dosen_id' => 'required|exists:users,id',
            'company_name' => 'required|string',
            'position' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date',
            'status' => 'required|in:active,finished'
        ]);

        try {
            $internship = Internship::create($data);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to create internship',
                'error' => $e->getMessage()
            ], 500);
        }

        return response()->json([
            'message' => 'Internship created successfully',
            'data' => $internship
        ], 201);
    }

    public function update(Request $request, $id) {
        $internship = Internship::findOrFail($id);

        $data = $request->validate([
            'supervisor_id' => 'sometimes|exists:users,id',
            'dosen_id' => 'sometimes|exists:users,id',
            'company_name' => 'sometimes|string',
            'position' => 'sometimes|string',
            'start_date' => 'sometimes|date',
            'end_date' => 'nullable|date',
            'status' => 'sometimes|in:active,finished'
        ]);

        try {
            $internship->update($data);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to update internship',
                'error' => $e->getMessage()
            ], 500);
        }

        return response()->json([
            'message' => 'Internship updated successfully',
            'data' => $internship
        ]);
    }

    public function destroy($id) {
        
        try {
            Internship::findOrFail($id)->delete();
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to delete internship',
                'error' => $e->getMessage()
            ], 500);
        }

        return response()->json([
            'message' => 'Internship deleted successfully'
        ]);
    }

    public function myInternship(Request $request) {
        $internship = Internship::with(['supervisor', 'dospem'])
            ->where('intern_id', $request->user()->id)
            ->firstOrFail();

        if (!$internship) {
            return response()->json([
                'message' => 'No internship found for the authenticated intern'
            ], 404);
        }

        return response()->json([
            'message' => 'Internship retrieved successfully',
            'data' => $internship
        ]);
    }
}
