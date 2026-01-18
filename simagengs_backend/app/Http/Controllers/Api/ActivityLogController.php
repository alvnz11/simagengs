<?php

namespace App\Http\Controllers;

use App\Models\ActivityLog;
use Illuminate\Http\Request;

class ActivityLogController extends Controller
{
    public function index(Request $request) {
        $logs = ActivityLog::where('user_id', $request->user()->id)
            ->latest()
            ->paginate(10);

        return response()->json(
            $logs
        );
    }
}
